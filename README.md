# **_Point of Sale System/Inventory_**

## 7 July 2023

### by Brian Crowe - [Github](https://github.com/Crowe-Brian-J) - [LinkedIn](https://www.linkedin.com/in/brian-j-crowe/)

---

## **_Getting Started_**
[Trello](https://trello.com/b/AVSY0dB0/posinventory) - [ERD](https://app.diagrams.net/?src=about#G1zQh0TeX3oaK7e9sYKUagQ4-DJjwloDWM) - [CHD (abbreviated for funsies)](https://app.diagrams.net/#G1pLPftsFrwQyJKpBvCdzGS3Dkbs2C7Ncg)



---

## **_Description_**

I created a Point of Sale and Inventory Control System in a week and a half. Visually, it is easy to navigate. All buttons and navigations function as intended. The models were the most complex I've worked with, having dependencies and strict value checks. Attempting to get the frontend to play with the backend was sometimes challenging. After getting everything connected, I reached MVP. It was 2:46am the day it was due. I'm happy because I struggled with keeping everything in line and functioning correctly here, especially given the timeframe.

---

## **_Models_**

- **_Vendors_** own products
- **_Products_** belong to vendors, transactions, orders
- **_Orders_** belong to vendors, populate inventory
- **_Transactions_** use products, depopulate inventory (unless returned, then populate by subtracting negative values)

---

## **_Relationships_**

  - Vendors have a 1:M relationship with Products, Orders
  - Orders have a 1:M relationship with Products
  - Transactions have a 1:M Relationship with Products

---

## **_Technologies Used_**

  - MongoDB
  - Express
  - React
  - Node.js
  - JavaScript

  Stretch Ideas
  - Stripe API **_?_**
  - IDScan.net API (Customers' ages) **_?_**
  - UPCindex.net **_?_**

---

## **_User Stories_**

**_As A User (AAU):_**

- AAU, I should be able to complete a transaction
    - Scan Items
    - Adjust Quantity
    - with cash
      - give change back
    - or card (debit or credit)
    - (It should not care about inventory levels, those may be wrong)
- AAU, I should be able to create an order
- AAU, I should be able to receive an order and make applicable changes (item not shipped, or broken)
- AAU, I should be able to view inventory levels
- AAU, I should be able to view prior transactions
- AAU, I should be able to create new products
- AAU, I should be able to edit existing products
- AAU, I should be able to delete existing products

---

## **_Screenshots_**

Transaction Page:
![Image](/pictures/Screenshot%202023-07-19%20at%2011.43.55%20AM.png)

Vendor List Page:
![Image](/pictures/Screenshot%202023-07-19%20at%2011.44.33%20AM.png)

Add a Product Page:
![Image](/pictures/Screenshot%202023-07-19%20at%2011.44.54%20AM.png)