const Design = require('../models/design.model');


exports.getUserDesigns = async (req, res) => {
    try{
        const userId = req.user.userId;

        const designs = await Design.find({userId}).sort({updatedAt : -1});
     
        return res.status(200).json({
            success : true,
            message : "Designs fetched successfully",
            data : designs
        })
    }catch(error){
        console.error('Error while fetching designs for user : ', error);
        res.status(500).json({
            success : false,
            message : "Failed to fetch designs for user",
        })
    }
}

exports.getDesignById = async (req, res) => {
    try {
        const userId = req.user.userId;

        const designId = req.params.id;

        const design = await Design.findOne({userId, _id : designId});

        if(!design){
            return res.status(404).json({
                success : false,
                message : "Design not found! or you don't have permission to access this design",
            })
        }
     
        return res.status(200).json({
            success : true,
            message : "Design fetched successfully",
            data : design
        })
    } catch (error) {
        console.error("Error while fetching designs for ID : ", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch designs for ID",
        });
    }
};


exports.createDesign = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {designId, name, canvaData, width, height, category} = req.body;

        if(designId) {   // means we are updating the design
            const design = await Design.findOne({userId, _id : designId});

            if(!design){
                return res.status(404).json({
                    success : false,
                    message : "Design not found! or you don't have permission to access this design",
                })
            }

            if(name) design.name = name;
            if(canvaData) design.canvaData = canvaData;
            if(width) design.width = width;
            if(height) design.height = height;
            if(category) design.category = category;

            design.updatedAt = Date.now();
            const updatedDesign = await design.save();

            return res.status(200).json({
                success : true,
                message : "Design updated successfully",
                data : updatedDesign
            })
        }

        const newDesign = new Design({
            userId,
            name: name | "Untitled Design",
            canvaData,
            width,
            height,
            category
        });

        const saveDesign = await newDesign.save();

        return res.status(200).json({
            success : true,
            message : "Design created successfully",
            data : saveDesign
        })


    } catch (error) {
        console.error("Error while creating design : ", error);
        res.status(500).json({
            success: false,
            message: "Failed to create design",
        });
    }
}


exports.deleteDesign = async (req, res) => {
    try {
        const userId = req.user.userId;
        const designId = req.params.id;

        const design = await Design.findOne({userId, _id : designId});

        if(!design){
            return res.status(404).json({
                success : false,
                message : "Design not found! or you don't have permission to access this design",
            })
        }

        await Design.deleteOne({_id : designId});
     
        return res.status(200).json({
            success : true,
            message : "Design deleted successfully",
        })
        
    } catch (error) {
        console.error("Error while deleting design : ", error);
        res.status(500).json({
        success: false,
        message: "Failed to delete design",
        });
    }
}