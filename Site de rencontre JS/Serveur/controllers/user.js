const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
const {body} = require('express-validator');
const {validateBody} = require('./validation/road');
const Client = require('../models/clients');

router.get('/', async (req, res) => {
    res.status(200).send(await Client.findAll());
});

router.get('/:id', async (req,res) => {
    const clientLoc = await Client.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!clientLoc){
        throw new Fail('Le compte utilisateur saisi est inexistant');
    }
    res.status(200).send(clientLoc);
});


router.post(
    '/'
    body('id').notEmpty(),
    body('lastName').notEmpty(),
    body('firstName').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty().isLength({min: 12}),
    async (req, res) => {
        validateBody(req);

        try {
            const clientId = await Client.findOne({
                where : {
                    [Op.or]: [
                        {id: req.body.id},
                        {email.req.body.email}
                    ]
                }
            })

        } if (clientId) {
            new Fail('Le compte utilisateur existe déjà');
            
        } 
        const newClient = Client.build({
            id: req.body.id,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            sexe: req.body.sexe,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
            })
            await newClient.save();
            res.status(201).json({succes: `Le compte utilisateur ${newClient.firstName} a bien été crée.`});
        } catch (fail) {
            console.error(fail)
            res.status(409).json({error: fail.errors[0].msg})
        }          
    }
};

router.post('/login', async (req,res) => {
    try {
        const client = await Client.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        };
        if(client) {
            const mdp = await bcrypt.compare(
                req.body.password,
                client.password
            );
            if(mdp) {
                let token = jwt.sign({
                    'Id': user.Id,
                    'lastName': user.lastName,
                    'firstName': user.firstName,
                    'id': user.id,
                    'email': user.email,
                },
                process.env.SECRET
                );
                res.status(200).json({token: token});
            } else {
                res.status(400).json({
                    error: "Le mot de passe saisi n'est pas correct"
                }
            )
        } else {
            res.status(404).json({
                error: "L'utilisateur ne figure pas dans la base de donnée"
            }
        );
    }
            } catch (A) {
                console.error(A)
            }
})
router.put('/Id', async (req,res) => {
    try {
        const rClient = await Client.findOne(
            {
                where: {
                    Id: req.params.Id
                }
            }
        )
        await Client.update(
            {
                Id: req.body.Id,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
            },
            {
                where:
                Id: req.params.Id
            }
        }
    )
res.status(200).json({succes: `${rClient.firstName} (${req.params.Id}) est bien mis à jour dans la base de donnée`})
    } catch (fail) {
        res.status(401).json({error: fail})
    }
});

router.delete('/Id', async (req,res) => {
    try {
        await Client.destroy(
            {
                where: {
                    Id: req.params.Id
                }
            }
        )
        res.status(200).json({reussite: `Le compte utilisateur est bien supprimé`})
    } catch (fail) {
        res.status(401).json({error: fail})
    }
});
exports.initializationRoutes = () => router;



