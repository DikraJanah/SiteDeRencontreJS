const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const {validateBody} = require ('./validation/route');
const Meet = require ('../models/meetingModel');

router.get('/', async (req, res) => {
    res.status(200).json({'clientMeet': await Meet.findAll()});
});

router.get('/:ID', async (req, res) => {
    console.log(req.params.id)
    const meetingLoc = await Meet.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!meetingLoc) {
        res.status(200).json({'clientMeet' : 'Pas de match'});
    } else {
        res.status(200).json({'clientMeet': meetingLoc});
    }
});

if(!meetingLoc) {
    res.status(200).json({'clientMeet': 'Pas de match'});
} else {
    res.status(200).json({'clientMeet': meetingLoc});
}
});

router.post('/',
    body('firstname').notEmpty(),
    body('lastName').notEmpty(),
    body('sexe').notEmpty(),
    body('birthday').notEmpty(),
    body('rating').notEmpty(),
    body('remarque'),
    async (req,res) => {
        validateBody(req);
        try {
            const newClient = Meet.build({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sexe: req.body.sexe,
                birthday: req.body.birthday,
                rating: req.body.rating,
                remarques: req.body.remarques,
            })
            await newClient.save();
            res.status(201).json({
                succes: `${newClient.firstName} ${newClient.lastName} est bien consigné.`
            }
        )
            catch(e) {
                console.error(e),
                res.status(409).json({error: e.errors[0].message})
            }
     }
);

router.put('/:id', async (req, res) => {
    try {
        await Meet.update({
            meetUserId: req.body.meetUserId,
            birthday: req.body.birthday,
            rating: req.body.rating,
            remarques: req.body.remarques,
        })
        await newClient.save();
        res.status(201).json({
            succes: `${newClient.firstName} ${newClient.lastName} est bien consigné`
        }
    )
    catch(e) {
        console.error(e) {
            res.status(409).json({error: e.errors[0].message})
        }
    }
);

router.put('/:id', async (req, res) => {
    try {
        await Meet.update({
        meetUserId: req.body.meetUserId,
        birthday: req.body.birthday,
        rating: req.body.rating,
        remarques: req.body.remarques,
        },
        {
            where: {
                id : req.params.id
            }
        }

        )
        res.status(200).json({succes: `L'utilisateur est bien mis à jour`})
        
    } catch (err) {
        console.log(err)
        res.status(401).json({error: err})
    }
});

router.delete(':/id', async (req,res) => {
    try {
        await clientMeet.destroy(
            {
                where: {
                    id.req.params.id
                }
            }
        )
        res.status(204).json({succes: `L'utilisateur selectionné a bien été supprimé.`});
    } catch (err) {
        res.status(401).json({error: err})
    }
});

exports.initializationRoutes = () => router;
