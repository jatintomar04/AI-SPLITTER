const Expenses = require("../models/expenseModel");
const Group = require("../models/groupModel");
// const User = require("../models/authModel")
const generateAIResponse = require("../utils/geminaiApi");

const chatBot = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user._id;

        // 1. Database se pure data fetch karo
        const expenses = await Expenses.find({ paidBy: userId });

        // 2. Data Clean up: Faltu fields hatao taaki Gemini tokens waste na kare aur precise calculate kare
        const cleanData = expenses.map(e => ({
            title: e.title,
            amount: e.amount,
            category: e.category || "Other",
            type: e.type, // self or group
            date: e.date
        }));

        const selfExpenses = cleanData.filter(e => e.type === "self");
        const groupExpenses = cleanData.filter(e => e.type === "group");

        // 3. Super Tight Professional Prompt Layout
        const prompt = `
        User Request: "${message}"

        Context Database Records:
        ---
        [SELF/PERSONAL ENTRIES]:
        ${selfExpenses.length > 0 ? JSON.stringify(selfExpenses) : "No self entries logged."}

        [GROUP SHARED ENTRIES]:
        ${groupExpenses.length > 0 ? JSON.stringify(groupExpenses) : "No group entries logged."}
        ---

        Execution Command Matrix:
        - Detect user intent from the User Request.
        - Read the User Question carefully and detect its language/style (Hinglish, Hindi, English, etc.).
        - Respond ONLY in the language/style detected from the User Question.
        - Give an immediate point-to-point exact arithmetic evaluation response.
        - Do not generate long text blocks, introductions, explanations, or notes.
        `;

        // 4. Trigger clean structured utility call
        const reply = await generateAIResponse(prompt);

        return res.status(200).json({
            success: true,
            reply: reply.trim() // Leading/trailing white spaces clean up
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





//   group chat 


const groupChatBot = async (req, res) => {

    try {
        const { message, groupId } = req.body;

        const group = await Group.findById(groupId)
            .populate("members", "name");

        const expenses = await Expenses.find({ group: groupId })
            .populate("paidBy", "name");

        const summary = {
            groupName: group.name,
            members: group.members.map(m => m.name),
            expenses: expenses.map(e => ({
                title: e.title,
                amount: e.amount,
                paidBy: e.paidBy.name
            }))
        };

        const prompt = `
You are an AI Splitwise assistant.

You can answer ANY question like:
- how much A owes B
- who owes money
- total expenses
- settlement calculation


DATA:
${JSON.stringify(summary, null, 2)}

USER QUESTION:
${message}

Give exact financial answer.
`;

        const reply = await generateAIResponse(prompt);

        return res.status(200).json({
            reply
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};
module.exports = { chatBot , groupChatBot};