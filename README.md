steps to run this repository ?

clone the repository

npm i

register
http://localhost:3000/user/register
login
http://localhost:3000/user/login

(gives token)


Main Task :

createCustomer:post
http://localhost:3000/customer/

payload:
{
    "first_name":"Het",
    "last_name":"Choudhary",
    "city":"Dang",
    "company":"xyz"
}

getAllCustomer:get
http://localhost:3000/customer/

payload:
{
    "search_text":null,
    "skip":0,
    "take":20
}


getCustoemrById:get
http://localhost:3000/customer/56a2ba0a-1882-4973-9df2-b93c94242486



createMultipleCustomer:post
http://localhost:3000/customer/create-multiple

payload:
{
    "customerArray":[
    {
        "first_name": "Joker",
        "last_name": "Premanand",
        "city": "Surat",
        "company": "ryt"
    },
    {
        "first_name": "Samanth",
        "last_name": "patel",
        "city": "Vadodara",
        "company": "jgh"
    },
    {
        "first_name": "Prem",
        "last_name": "Dodhiawala",
        "city": "Ahmedabad",
        "company": "abc"
    }
]
}

updateCustomer:put

http://localhost:3000/customer/56a2ba0a-1882-4973-9df2-b93c94242486

payload:
{
    "first_name":"newOne",
    "last_name":"surti",
    "city":"Dabng",
    "company":"xyz"
}



Now With the authorization:

delete the Customer:PUT

http://localhost:3000/customer/56a2ba0a-1882-4973-9df2-b93c94242486

using the authorization middleware





