# PortFolioNodejsAPI

# Add Trade API

https://portfolionodejsapi.herokuapp.com/trade/addTrade

example post request body = {
"trade_name" : "Godrej India",
"user_id" : "606a13c58acc142e9c1a5fa1",
"ticker_symbol" : "GODREJIND",
"type" : "Sell",
"shares": 8,
"trade_price": 5
}

# Update Trade API

https://portfolionodejsapi.herokuapp.com/trade/update

example put request body = {
"shares" : 6,
"ticker_symbol": "TCS",
"type": "Buy",
"trade_price": 20,
"trade_id":"606a1419d3d90a4930fba4f4"
}

# Get Trades API

https://portfolionodejsapi.herokuapp.com/trade/getAll

# Get Trade by id API

https://portfolionodejsapi.herokuapp.com/trade/:id
id is required as param

# Delete Trade API

https://portfolionodejsapi.herokuapp.com/trade/delete/:id
id is required as param

# Get PortFolio API

https://portfolionodejsapi.herokuapp.com/portfolio/getPortfolio/:id
id is required (id is ObjectID in user collection)

# Get Returns API

https://portfolionodejsapi.herokuapp.com/portfolio/getReturn/:id
id is required (id is ObjectID in user collection)

# Add User API

https://portfolionodejsapi.herokuapp.com/user/add
example post request body = {
name : "Akash"
}
