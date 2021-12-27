const express = require("express");
const router = express.Router();
const {  insert, getData, update, deleteDocument, getCount } = require('./db')

router.post("/", async (req, res) => {
});

router.post("/getData", async (req, res) => {
    console.log(req.body.sort)
    const data = await getData(req.body.page, req.body.itemsPerPage, req.body.searchValue, req.body.sort);
    if(data) {
        return res.status(200).json(data);
    } else {
        return res.status(400).json("Error fetching data");
    }

})

router.post("/count", async (req, res) => {
    const data = await getCount(req.body.searchValue);
    if(data) {
        return res.status(200).json(data);
    } else {
        return res.status(400).json("Error fetching data");
    }
})

router.post("/createNew", async (req,res) => {
    const response = await insert(req.body)
    if(response) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json("create new user failed, please try again later");
    }
})

router.post("/updateUser", async (req,res) => {
    const response = await update(req.body)
    if(response) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json("update failed, please try again later");
    }
})

router.post("/deleteUser", async (req,res) => {
    const response = await deleteDocument(req.body)
    if(response) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json("delete user failed, please try again later");
    }
})


module.exports = router;