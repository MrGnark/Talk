# Coté client

## usr_register : Requete d'inscription

Paramètres :
    - usr : nom d'utilisateur
    - code : mot de passe


## usr_connect : Requête de connection

Paramètres :
    - usr : nom d'utilisateur
    - code : mot de passe


## usr_msg : Envoi de message

Paramètres :
    - usr : nom d'utilisateur
    - msg : message



# Côté serveur

## register_state : Statut de l'inscription

Paramètres :
    - usr : nom d'utilisateur
    - status : résultat de l'opération; valeurs possibles
        - done         : tout s'est bien passé
        - existing_usr : l'utilisateur existe déja
        - fatal_error  : une erreur inconnue s'est produite


## connect_state : Statut de la connexion

Paramètres :
    - usr : nom d'utilisateur
    - status : résultat de l'opération
        - done        : tout s'est bien passé
        - unknown_usr : l'utilisateur n'existe pas
        - wrong_code  : le mot de passe est erroné
        - fatal_error : une erreur inconnue s'est produite

## connected : Un utilisateur s'est connecté

## message : Envoi de message

Paramètres :
    - usr : nom d'utilisateur
    - msg : message

