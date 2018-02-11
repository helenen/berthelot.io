---
title: GraphQL, côté serveur ça donne quoi ?
date: 2018-01-09
---

<!-- .slide: data-background="#ffffff" -->
# GraphQL, côté serveur ça donne quoi ?

<img style="height: auto;" src="../assets/graphql-archi/graphql.png" />



## Avant tout, parlons architecture

Voyons comment se passe les échanges clients serveurs


<img style="height: 90%;" src="../assets/graphql-archi/start-http.jpg"/>


<img style="height: 90%;" src="../assets/graphql-archi/http_bdd.jpg"/>


<img style="height: 90%;" src="../assets/graphql-archi/php-style.jpg"/>


<img style="height: 90%;" src="../assets/graphql-archi/micro-services.jpg"/>



## SOAP - requête

```
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<SOAP-ENV:Envelope
 SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"
 xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
 xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
 xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
 xmlns:xsd="http://www.w3.org/1999/XMLSchema">
  <SOAP-ENV:Body>
  	<ns1:getUser xmlns:ns1="urn:MySoapServices">
  		<param1 xsi:type="xsd:int">123</param1>
  	</ns1:getUser>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
````


## SOAP - Avantages

On est sûr du type du retour


## SOAP - Avantages

<img style="height: 90%;" src="https://media.giphy.com/media/xT9IggDCSIWH5jcOdy/giphy.gif"/>


## SOAP - Avantages

<img style="height: 90%;" src="https://media.giphy.com/media/3o7TKGVqdQdyGb3aDe/giphy.gif"/>


## SOAP - Inconvégnient

- Trop verbeux
- Pas de gestion des versions
- Pas open-data friendly



## Rest - requête

```
GET http://api.aya.fr/users/123
```

Et on envoie d'autres informations via les header
```
AUTHORIZATION: AJSONWEBTOKEN
ACCEPT: application/json;version=2
```


## Rest - réponse

```
{
  "name": "Florent Berthelot"
  "company": "Zenika"
  "friends": [
    {
      name: "JAWAD",
      catchPhrase: "sandwich boursin poulet"
    },
    {
      name: "HAULMES",
      firstName: "francis",
      catchPhrase: "j'ai le physique de l'emploi"
    }]
}
```

Header
```
Link: <users/123/friends>; rel="friends"
```


## REST - Avantages

- Facile à requêter et documenter
- Facilement compatible Open-Data
- Versioning


## REST - inconvégnents

- Pas de typage
- Peut générer des erreurs côté client



## GraphQL - Requête

```
Query($id: 123) {
  users(id: $id) {
    name
    company
    friends {
      name
    }
  }
}
```


## GraphQL - Réponses

```
{
  "name": "Florent Berthelot"
  "company": "Zenika"
  "friends": [
    {
      name: "JAWAD"
    },
    {
      name: "HAULMES"
    }
  ]
}
```


## GraphQL - côté serveur

Les résolveurs

```
resolvers: {
    Query: {
      users: getUser(db)
    }
    users: {
      friends: getFriend(db)
    }
  }
```


## GraphQL

<img style="height: 90%;" src="../assets/graphql-archi/micro-services.jpg"/>


## GraphQL

<img style="height: 90%;" src="../assets/graphql-archi/spa-micro-service.jpg"/>


## GraphQL

<img style="height: 90%;" src="../assets/graphql-archi/spa_big-sql.jpg"/>


## GraphQL

<img style="height: 90%;" src="../assets/graphql-archi/graphql-multiple-queries.jpg"/>



## GraphQL, c'est jeune

<img style="height: 90%;" src="https://media.giphy.com/media/YWywSr6bPU87u/giphy.gif"/>


## On va tous s'amuser avec

<img style="height: 90%;" src="https://media.giphy.com/media/j6n6LTaPyWziE/giphy.gif"/>


## On va mettre en place de nouvelles bonne pratiques

<img style="height: 90%;" src="https://media3.giphy.com/media/xUA7aV7yM7551LLHGg/giphy.gif"/>


## Et ça va devenir sérieux !

<img style="height: 90%;" src="https://media.giphy.com/media/bBzL2zyY9VgHe/giphy.gif"/>
