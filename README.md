# EduGate
- ####Tp in Express js Class

## SEtudiant.js
- #### post -> /inscrir   (add inscription "the cne is unique for each inscription and the nb of filiere must be less than 100")
- #### post -> /demodifier/{id} (add DmModification "check if already the same cne is not exist in DmModifications")
- #### put -> /modifier/{id} (modify inscription "check if already the etudiant has demanded to modify ,if yes check if demande accepted, if yes check if datenow-actiondate<1week , if yes modify the inscription")
- #### get -> /inscription/{id}

## SGestionnaire.js :
- #### post -> /acceptModification/{id} (update accepted:true and Actiondate to now if dmModification exist)
- #### post -> /cancelModification/{id} (update accepted:false and accdate to now if dmModification exist)
- #### get -> /demandes (la list des dmModifications)
- #### get -> /attdemandes (la list des dmModifications where accepted null et actionDate null)
- #### get -> /accepteddemandes (la list des dmModifications where accepted true )
- #### get -> /canceleddemandes (la list des dmModifications where accepted false )
