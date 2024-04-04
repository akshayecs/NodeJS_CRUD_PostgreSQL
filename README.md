steps to run this repository ?

clone the repository
--------------------------------------------------------------------------------------------------------
npm i
---------------------------------------------------------------------------------------------------------
RUN  script given in the database.txt file it will help you create two tables:
customer and users

----------------------------------------------------------------------------------------------------------
1)register
http://localhost:3000/user/register

payload:
//you can give any role out of this three manager,editor,viewer(make sure to write in the small latters only) 
{
    "username":"dfdf",
    "email":"gdffdfdgfg@gmail.com",
    "password":"pavan123",
    "role":"manager"
}

----------------------------------------------------------------------------------------------------------
2)login
http://localhost:3000/user/login

payload:
{
   "email":"gdffdfdgfg@gmail.com",
    "password":"pavan123"
}
(gives token)

--------------------------------------------------------------------------------------------------------------
                                    *using the authorization middleware*
--------------------------------------------------------------------------------------------------------------
CRUD :

createCustomer:POST
http://localhost:3000/customer/

payload:
{
    "first_name":"Het",
    "last_name":"Choudhary",
    "city":"Dang",
    "company":"xyz"
}

---------------------------------------------------------------------------------------------------------------

getAllCustomer:GET
http://localhost:3000/customer/

payload:
(Note:you can search with first_name,last_name or city of the customer)
{
    "search_text":"Akshay",
    "skip":0,
    "take":20
}

---------------------------------------------------------------------------------------------------------------

getCustoemrById:GET
(Note:pass the customer_id as the parameter in the url)
http://localhost:3000/customer/56a2ba0a-1882-4973-9df2-b93c94242486

---------------------------------------------------------------------------------------------------------------

createMultipleCustomer:POST
http://localhost:3000/customer/create-multiple

(Note:make sure you will pass the array of customer details as given below)

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

------------------------------------------------------------------------------------------------------------------

updateCustomer:PUT
(Note:pass the customer_id as the parameter in the url)
http://localhost:3000/customer/56a2ba0a-1882-4973-9df2-b93c94242486

payload:
{
    "first_name":"newOne",
    "last_name":"surti",
    "city":"Dang",
    "company":"xyz"
}

-------------------------------------------------------------------------------------------------------------------

delete the Customer:DELETE

http://localhost:3000/customer/56a2ba0a-1882-4973-9df2-b93c94242486






