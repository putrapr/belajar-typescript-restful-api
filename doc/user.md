# User API Spec

## Register User
Endpoint : POST /api/users  
Request Body :
```json
{
  "username" : "putra",
  "password" : "rahasia",
  "name" : "Putra Prasetya
}
```  

Response Body (Success) :
```json
{
  "data" : {
    "username" : "putra",
    "name" : "Putra Prasetya 
  }
}
```

Response Body (Failed) :
```json
{
  "errors" : "Username must not blank"
}
```

## Login User
Endpoint : POST /api/users/login  
Request Body :
```json
{
  "username" : "putra",
  "password" : "rahasia"
}
```  

Response Body (Success) :
```json
{
  "data" : {
    "username" : "putra",
    "name" : "Putra Prasetya",
    "token" : "uuidabcdefghijklmnopq"
  }
}
```

Response Body (Failed) :
```json
{
  "errors" : "Wrong username or password"
}
```

## Get User
Endpoint : GET /api/users/current  
Request Header :  
- X-API-TOKEN : token

Response Body (Success) :
```json
{
  "data" : {
    "username" : "putra",
    "name" : "Putra Prasetya 
  }
}
```

Response Body (Failed) :
```json
{
  "errors" : "Unauthorized, ..."
}
```


## Update User
Endpoint : PATCH /api/users/current  
Request Header :  
- X-API-TOKEN : token

Request Body :
```json
{
  "password" : "rahasia", // tidak wajib, karena pakai patch
  "name" : "Putra Prasetya" // tidak wajib, karena pakai patch
}
```  

Response Body (Success) :
```json
{
  "data" : {
    "username" : "putra",
    "name" : "Putra Prasetya 
  }
}
```

Response Body (Failed) :
```json
{
  "errors" : "Unauthorized, ..."
}
```


## Logout User
Endpoint : DELETE /api/users/current  
Request Header :  
- X-API-TOKEN : token

Response Body (Success) :
```json
{
  "data" : "OK"
}
```

Response Body (Failed) :
```json
{
  "errors" : "Unauthorized, ..."
}
```