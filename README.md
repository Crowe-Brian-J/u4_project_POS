# **_Point of Sale System/Inventory_**

## 7 July 2023

### by Brian Crowe

---

## **_Description_**

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
