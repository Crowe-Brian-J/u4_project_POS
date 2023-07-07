# **_Point of Sale System/Inventory_**

## 7 July 2023

### by Brian Crowe - [Github](https://github.com/Crowe-Brian-J) - [LinkedIn](https://www.linkedin.com/in/brian-j-crowe/)

---

## **_Getting Started_**
[Trello](https://trello.com/b/AVSY0dB0/posinventory) - [ERD](https://app.diagrams.net/?src=about#G1zQh0TeX3oaK7e9sYKUagQ4-DJjwloDWM) - [CHD (abbreviated for funsies)](https://app.diagrams.net/#G1pLPftsFrwQyJKpBvCdzGS3Dkbs2C7Ncg)



---

## **_Description_**

When I was in the Package Store Business (Liquor Stores for you heathens), I hated every Point of Sale (POS) System we had/were shown. It wasn't really optimized for a Liquor Store. If it was, it wasn't intuitive. Or it didn't track inventory well, specifically when we rang 30 or 36 packs of cans to make 6 packs, but also for breakage and discounts. It also offered so much customization and old databases that didn't merge well that we would wind up with 4 different ways to add 750mL bottles of wine to the system. Nothing was uniform because naming conventions had been done by one old man 40 years ago, and he refused to follow it. I'd prefer to consolidate options and make things as streamlined as possible, while still allowing employees to do their jobs correctly and efficiently.

With that in mind I'd like to create something usable and intuitive in the next week and a half... and beyond.

---

## **_Models_**

- **_Users_**
  - **_Cashiers_** Can Perform Transactions, Lookup Stock Levels, Lookup Prices, Submit Breakage, Balance Till
  - **_Managers_** Can Do Anything a Cashier Can Do **_&_** Receive Orders from Vendors, add and delete users, change prices, accept breakage
- **_Vendors_** exist to create orders. You cannot order something from a vendor that they don't have
- **_Products_** belong to Inventory, belong to Vendors
- **_Customers_** can make purchases. Managers can keep track of trends

---

## **_Relationships_**

  - Vendors have a 1:M relationship with Products
  - Inventory has a 1:M relationship with Products **_OR_** Is inventory level a piece of the product?

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

I think I'm scattered here thinking about doing everything necessary for my old standard day-to-day stuff instead of going basic and expanding from there

**_As A User (AAU):_**

- AAU, I should be able to complete a transaction
    - Scan Items
    - Adjust Quantity
    - with cash
      - give change back
    - or card - Venmo Stretch?
    - (It should not care about inventory levels, those may be wrong)
- AAU, I should be able to create an order
- AAU, I should be able to receive an order and make applicable changes (item not shipped, items delivered not on order)
- AAU, I should be able to adjust inventory levels based on breakage or case breaking (ringing 30/36pks or singles)
- AAU, I should be able to view inventory levels
  - Assign Danger Levels
- AAU, I should be able to get sales reports from previous day/week/month/year/custom timeframe
    - View/Sort Trends
- AAU, I should be able to get discount pricing on high volume sales
