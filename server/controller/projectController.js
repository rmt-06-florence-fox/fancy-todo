const {Project,User,ProjectUser} = require('../models')
const { Op } = require('sequelize')


class ProjectController {

    static async getProject(req,res,next){
        console.log('================== Token decoded data from get project==============')
        console.log(req.loggedInUser.payload.id)
        const userId = req.loggedInUser.payload.id
        // const userId = req.body.UserId
        try {
            const userProject = await ProjectUser.findAll({
                where : {
                    UserId : userId
                },
                include : [Project]
            })
            res.status(200).json(userProject)
        } catch (error) {
            next(error)
        }
    }

    //tambahkan project  (POST)
    static async addNewProject(req,res,next){
        console.log('================== Token decoded data from add new project==============')
        console.log(req.loggedInUser.payload.id)
        const userId = req.loggedInUser.payload.id

        const newProjet = {
            name : req.body.name,
            due_date : req.body.due_date
        }

        try {
            const addProject = await Project.create(newProjet)
            console.log('============Add Project=====')
            const newProjectUser = {
                UserId : userId,
                ProjectId : addProject.id
            }
            console.log(newProjectUser)
            const addProjectToUser = await ProjectUser.create(newProjectUser)
            res.status(200).json({
                newProject : newProjectUser,
                newProjectUser : addProjectToUser
            })

        } catch (error) {
            next(error)
        }
    }
    //delete project (DELETE)
    static async deleteProject(req,res,next){
        console.log('======== delete ++++')
        const projectId = req.params.id
        try {
            const deleteProject = await Project.destroy({
                where : {
                    id : projectId
                }
            })

            if (deleteProject){
                res.status(200).json({message : 'Success delete project'})
            }else {
                throw {
                    status : 400,
                    message : 'Something Wrong when delete Project'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    //modifate Project (PATCH)
    static async modifyProject(req,res,next){
        const projectId = req.params.id

        try {
            const modifyProject = await Project.update({

            })
        } catch (error) {
            next(error)
        }
    }

    // Get project by Id

    static async getProjectById(req,res ,next){
        const projectId = req.params.id
        try {
            const getOneProject = await Project.findOne({
                where : {
                    id : projectId
                }
            })
            console.log('===== Get Project====')
            console.log(getOneProject)
            if(getOneProject){
                res.status(200).json(getOneProject)
            }else {
                throw {
                    status : "404",
                    message : 'Data Not Found'
                }
            }
        } catch (error) {
            next(error)
        }
    }
    //change project (PUT)
    static async replaceProject(req,res,next){
        const projectId = req.params.id

        const newData = {
            name : req.body.name,
            due_date : req.body.due_date,
        }

        try {
            const changeProject = await Project.update(newData,{
                where : {
                    id: projectId
                }
            })
            console.log(changeProject)
            if(!changeProject[0]){
                throw {
                    status : 404,
                    message : 'Data Not Found'
                }
            }else {
                res.status(200).json({
                    result : 'Success'
                })

            }
        } catch (error) {
            next(error)
        }
    }

    //delete user dari project (DELETE)
    static async deleteUserFromProject(req,res,next){
        console.log('============From delete User======')
        
        console.log(req.loggedInUser.payload.id)
        // const userId = req.loggedInUser.payload.id
        const userId = req.body.userId
        //untuk coba
        // const userId = req.body.userId
        const projectId = req.params.id

        try {
            const deleteProject = await ProjectUser.destroy({
                where : {
                    [Op.and] : [
                        {UserId : userId},
                        {ProjectId : projectId}
                    ]
                }
            })
            console.log('============From delete User======')
            console.log(deleteProject)
            if(deleteProject){
                res.status(200).json({
                    message : 'Success delete User From Project'
                })
            }else {
                throw {
                    status : 400,
                    message : 'something wrong'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    //tambahkan user ke project (POST)

    static async addUserToProject(req,res,next){
        // console.log(req.loggedInUser.payload.id)
        // const userId = req.loggedInUser.payload.id
        const userId = req.body.id
        const projectId = req.params.id

        const newData = {
            ProjectId : projectId,
            UserId : userId
        }
        try {
            const newUserAtProject = await ProjectUser.create(newData)
            console.log(newUserAtProject)
            if(newUserAtProject){
                res.status(200).json({
                    result : newUserAtProject
                })
            }else {
                throw {
                    status : 400,
                    message : 'something wrong'
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProjectController