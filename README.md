<h1 align="center"> Paardarshak</h1>


<p align="center">
  <img width="100" height="100" src="https://i.ibb.co/85JrF8R/logo.png">
</p>

## Problem 🌈

- Payers are unaware of how their money is utilized
- Fraudulent authorities indulge in corruption
- These problems restrict payers from paying proper tax or donate in a campaign as they are not sure about the legitimacy of authorities in the chain

## Solution ✔️

- **Track** : Payer can track how his individual contribution is being used.
- **Audit** : Anyone can audit how the total funds are being utilized
- **Corruptionless** : The exchange of funds between authorities is publicly available and is immutable.


## Use Case Diagram ✏️

![Use Case Diagram (Small)](https://user-images.githubusercontent.com/34777376/85917978-71a02e80-b87c-11ea-92d0-8fdbc6af0ff5.png)

## Diagram for Token Creation, Allot, Transfer, Payment ✏️

![Block Diagram - Page 1 (Small)](https://user-images.githubusercontent.com/34777376/85947796-780cd400-b96a-11ea-8915-4003d27fe7f5.png)


## Working Demo 🔥  paaradarshak.herokuapp.com

- Live on [Paardarshak](paaradarshak.herokuapp.com)
- [Demo Video](https://youtu.be/Zh_QQSMK-cY)

## Technologies Used ⚡️
-  Front End Frameworks: **HTML, CSS, React, Javascript**
-  Compiling and Deploying Smart Contracts:  **Truffle**
-  Blockchain used:  **Matic**
-  Interacting with Smart Contracts:  **Web3 JS**

## Instructions 📝 

### Installation

Get started quickly by cloning this repository. Install the dependencies
```sh
$ cd client && npm install
```
### Testing on Local Truffle Blockchain

- Create .secret file with your Mnemonic
* In root directoy create .secret file
* Open metamask and Go to Setting
* Go to Security and policy
* Click Reveal seed words and Enter password
* Copy the mnemonic (never push it to public repo)
* Paste it in .secret file


- Truffle Development Console
```sh
$ truffle develop
```
This will open truffle developer console and you will get 10 Account Addresses, import some of them in metamask by import account option.

- Truffle Compile
```sh
$ truffle compile
```
- Truffle Migration Local Network
```sh
$ truffle migrate
```
- Truffle Migration Matic Network
```sh
$ truffle migrate --network matic
```
### Starting the Server
```sh
$ cd client && npm start
```

## Miscellaneous
### We are not Aduitorium 

Hi, This is Abhishek, team member of **Paaradarshak** (Project listed above).
When we sent this submission to the community for review.
Some members thought that we are similar to Previous ETH India winner [**Aduitorium**](https://devfolio.co/submissions/aduitorium).
But we are different from each other, let's see the difference.

### Difference 

#### About Aduitorium
Aduitorium is a fundraising platform like fund me, 
where donors donate to the campaign and they can see 
how the whole campaign money is spent by the fund owner
Note that there is a single authority, which does payments.

#### Coming to Paaradarshak
- **We track particularly who is corrupt in the chain.**
The prime focus of paardarshak is in funds where there are multiple authorities. Once the fund owner allots some funds to the child, the child can transfer it to other children.
Imagine the government spending passed down from central gov to ministries to MPs to MLAs. The audience for Paaradarshak is different, however, it can act as a fundraising platform as well.

*Consider Paardarshak as a superset of fundraising.*
*Paardarshak covers a wide range of usecases from Government Budgets, Taxes Utilizations to Corporate funds.*

-  **Individual contribution tracking** 
In Aduitorium they track utilization of complete funds, not the utilization of individual contributions. We do both, if you donate 100 rs, you can not only check how the total funds raised by all the contributors were used but you can also track how your individual contribution is being utilized. This thing can be extended to real-time governance, where payers can vote if they want their money used for proposed cause or not.


*Therefore we are different and target different audiences.*


## Future Aspects 🚀

- **Payment via UPI | Onboarding more people**

Currently users pay in Matic Tokens,UPI can be integrated as a mode of payment. But it was not possible to get a GSTIN number to connect with payment APIs like (Razor or Google pay) in such a short time.

- **Uploading Result Proof | Adding more Legitimacy**

Currently the last stakeholder of authority chains, just enters the result as text without giving any proof for it. We plan to add a feature where they can upload result receipt or photo through MoBit.

## Any Query ?
 - Join us on [**discord**](https://discord.gg/sK2X6eY)

## Team Members 🏁

1. [**Abhishek Vispute**](https://github.com/abhishekvispute/)
2. [**Viraj Gawde**](https://gihub.com/VirajRG/)
3. [**Jatin Varlyani**](https://github.com/Jatin-8898/)
4. [**Anuj Arora**](https://github.com/Arora-Anuj)
