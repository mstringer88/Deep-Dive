let express = require('express');

let db = require('../db');

let router = express.Router();

// router.get('/:id?', async (req, res) => {

//     let id = req.params.id
//     if (id) {
//         let chirp = await db.GetChirp(id);
//         chirp = chirp[0];
//         return res.json({
//             id: chirp.id,
//             userid: chirp.userid,
//             chirp: chirp.text
//         });
//     } else {
//         let chirps = await db.GetChirps();
//         let response = Object.keys(chirps).map(key => {
//             let id = chirps[key].id;
//             let chirp = chirps[key].text;
//             let userid = chirps[key].userid;
//             return {
//                 id,
//                 userid,
//                 chirp
//             }
//         });
        
//         res.send(response);
//     }
// });

router.post('/', async (req, res) => {
    
    db.CreateChirp(req.body);
    let chirps = await db.GetChirps();
        let response = Object.keys(chirps).map(key => {
            let id = chirps[key].id;
            let chirp = chirps[key].text;
            let userid = chirps[key].userid;
            return {
                id,
                userid,
                chirp
            }
        });
        res.send(response);
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let editChirp = req.body.chirp
    db.UpdateChirp(id, editChirp);
    res.send(`It has been updated!`);
});

router.delete('/:id', (req, res) => {
    db.DeleteChirp(req.params.id);
    res.send(`It has been deleted!`);
});

router.get('/:id'), (req, res) => {
    db.GetMentions(req.params.id);
    res.send('it is working');
};

module.exports = router;