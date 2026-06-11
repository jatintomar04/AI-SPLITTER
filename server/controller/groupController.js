const Group = require("../models/groupModel");
const Expenses = require("../models/expenseModel")

const createGroup = async (req, res) => {
    try {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Group name is required"
            });
        }

        // create group
        const group = await Group.create({
            name,
            createdBy: req.user._id,
            members: [req.user._id] // creator automatically added
        });

        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            group
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getGroupExpenses = async(req,res)=>{
 try {
       const {id} = req.params
    const groupExpense = await Expenses.find({group :id })

      if (!groupExpense || groupExpense.length === 0) {
            return res.status(404).json({
                message: "No Expense Found!"
            });
        }
    return res.status(200).json({
        groupExpense
    })
    
 } catch (error) {
    res.status(500).json({
        message : error.message
    })
    
 }
}

const getGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const groups = await Group.find({
      members: userId,
    })
      .populate("members", "name email profilePic")
      .populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      count: groups.length,
      groups,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



const removeGroup = async (req,res) =>{
 try {
   const {groupId}=req.params

  const deleteGroup = await Group.findById(groupId)

if(!deleteGroup){
 return res.status(400).json({
    message : "group not found"
  })
}

if(deleteGroup.createdBy.toString()!== req.user._id.toString()){
  return res.status(403).json({
    message :  "Only group admin can delete this group",
  })
}
await Group.findByIdAndDelete(groupId);

res.status(200).json({
  message :" Group deleted sucessfully"
})
  
 } catch (error) {
 return res.status(500).json({
    message : error.message
  })
 }
} 
module.exports = { createGroup,getGroupExpenses, getGroups,removeGroup};