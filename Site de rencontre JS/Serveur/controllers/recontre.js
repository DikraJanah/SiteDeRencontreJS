const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {body} = require('express-validator');
const {validateBody} = require('./validation/road');
const {Op} = require('squeelize');
const Meeting = require('../models/rencontre');

router.get('/client/:clientID', async (req, res) => {
    res.status(200).json({'rencontres': await Meeting.findAll()});

})

router.get('/client/clientID', async (req, res) => {
    const meetingLoc = await Meeting.findAll({
        where: {
            clientID: req.params.clientId()
        }
    })
})
if (!meetingLoc) {
    res.status(200).json({'rencontres: 'Aucune rencontre'});
})
router.get('/met/:clientID', async (req,res) => {
    const Id = jwt.decode(req.params.clientID).Id
    const meetingLoc = await Meeting.findAll({
        where: {
            date: {
                [Op.lt]: new Date().toISOString()
            },
            clientID : Id
            }
        })
        if (!meetingLoc) {
            throw new Error('Aucune rencontre');
        }
        res.status(200).json({'rencontres': meetingLoc});
    })

    router.get('/meet/:clientId', async (req, res) => {
        const ID = jwt.decode(req.params.clientID).Id
        const meetingLoc = await Meeting.findAll({
            where: {
                date: {
                    [Op.gte]: new Date().toISOString()
                },
                clientID : Id
                }
            })
            if (!meetingLoc) {
                throw new Error ("Il n'y a pas eu de rencontre");
            }
            res.status(200).json({'meeting': meetingLoc});
        })
        router.post('/',
        body('date').notEmpty,
        body('rating').notEmpty(),
        body('remarque'),
        body('token').notEmpty,
        async (req,res) => {
            validateBody(req);
            try {
                constc newMeet = Meeting.build({
                    date: req.body?date,
                    rating: req.body.rating,
                    remarques: req.body.remarques,
                    meetUserId: req.body.meetUserId,
                    clientId: jwt.decode(req.body.token).id,
                })
                await newMeet.save();
                res.status(201).json({
                    reussite: `Vous avez matché!`
                }
            )
        } catch (e) {
            console.error(e)
            res.status(409).json({error: e.errors[0].message})
        }
    }
    };
    router.put('/:Id', async (req,res) => {
        try {
            await newMeet.update({
                date: req.body.date,
                rating: req.body.rating,
                remarque: req.body.remarque,
                meetUserId: req.body.meetUserId,
            },
            {
                where: {
                    Id: req.params.Id
                }
            }
        )
        res.status(200).json({succes: `Votre match a été mis à jour`})
        } catch (err) {
            console.log(err),
            res.status(401).json({error: fail})
        }
    });

    router.delete('/:Id', async (req, res) => {
        try {
            await Meeting.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.status(204).json({succes: `Votre match a été supprimé.`});
        } catch (err) {
            res.status(401).json({error: fail})
        }
    
        exports.initializationRoutes = () => router;
