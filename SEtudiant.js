const router = require("express").Router();
const Inscription = require('./db');
const Filiere = require('./db');
const DmModification = require('./db');

router.post('/inscrir', async (req, res) => {
  const { idInscription, cne, filiere, dateInscription } = req.body;

  const existingInscription = await Inscription.findOne({ cne });
  if (existingInscription) {
    return res.status(400).json({ message: 'Vous ete deja inscrit' });
  }

  const filiereData = await Filiere.findById(filiere);
  if (filiereData.nbEtu >= 100) {
    return res.status(400).json({ message: 'Cette filiere est plein' });
  }

  const newInscription = new Inscription({
    idInscription,
    cne,
    filiere,
    dateInscription,
  });
  await newInscription.save();
  res.json(newInscription);
});


router.post('/demodifier/:id', async (req, res) => {
  const { idModification, inscription } = req.body;

  const existingDmModification = await DmModification.findOne({ inscription });
  if (existingDmModification) {
    return res.status(400).json({ message: 'tu a deja demander de modifier' });
  }
  const newDmModification = new DmModification({
    idModification,
    inscription,
  });
  await newDmModification.save();
  res.json(newDmModification);
});


router.put('/modifier/:id', async (req, res) => {
  const { idInscription, cne, filiere, dateInscription } = req.body;

  const existingDmModification = await DmModification.findOne({ inscription: idInscription });
  if (existingDmModification) {
    const timeDifference = Date.now() - existingDmModification.dateAprouvement;
    if (timeDifference < 604800000) {
      await Inscription.updateOne({ idInscription }, { cne, filiere, dateInscription });
      res.json({ message: 'Inscription modifier' });
    } else {
      res.status(400).json({ message: 'tu a passer le delais d\'une semaine '});
    }
  } else {
    res.status(400).json({ message: 'tu doit demander de modifier l\'inscription premierement' });
  }
});

router.get('/inscription/:id', async (req, res) => {
  const { id } = req.params;
  const inscription = await Inscription.findById(id);
  if (!inscription) {
    return res.status(404).json({ message: 'Inscription not found' });
  }
  res.json(inscription);
});

module.exports = router;