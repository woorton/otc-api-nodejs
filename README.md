# Woorton API Implementation In Node JS

This repositary is a Node JS implementation of Woorton API: https://docs.woorton.com/

<br>

## Prerequisites
- Node Js
- https://nodejs.org/en/download/

Homebrew: 
- for Mac OS https://treehouse.github.io/installation-guides/mac/homebrew
- for Windows and Linux https://docs.brew.sh/Homebrew-on-Linux

Yarn
- https://legacy.yarnpkg.com/fr/docs/install/

<br>

## Installation
- Clone or download the repository on your computer 

- On a new terminal, go to the following directory:

<code>cd /PATH/otc-api-nodejs/woorton</code>

 - Install the recquired packages and build the bundle (this only need to be done once):

<code>npm install</code>

<br>

# Example use of the CLI
Commands need to be executed on the following directory:

<code>cd /PATH/otc-api-nodejs/woorton</code>

Dictionary:
	prefixForCommand:  «./bin/woorton» 

<br>

## help
To display all the commands available for the API:

<code>./bin/woorton</code>

Example response: 

	Usage: woorton [options] [command]

	Options:
	-h, --help                 output usage information

	Commands:
	getBalance
	getExposures
	getInstruments
	getLedger [options]
	requestForQuote [options]
	trade [options]
	makeTrade [options]
	order [options]
	testWebsocket [options]
	getLevels [options]

To display all the different options on a command:

<code>./bin/woorton getLedger --help</code>

	Usage: woorton makeTrade [options]

	Options:
	--amount [amount]          
	--total [total]            
	--instrument [instrument]  
	--direction [direction]    
	-h, --help                 output usage information

<br>

## instruments
To display all the instruments available:

<code>./bin/woorton getInstruments</code>

Example response: 

	«  {
		instrument: [
				'ETHEUR.SPOT', 'ETHUSD.SPOT', 'ETHGBP.SPOT',
				'ETHUST.SPOT', 'ETHCAD.SPOT', 'ETHCHF.SPOT',
				'ETHBTC.SPOT', 'BTCEUR.SPOT', 'BTCUSD.SPOT',
				'BTCGBP.SPOT', 'BTCUST.SPOT', 'BTCCAD.SPOT',
				'BTCCHF.SPOT', 'LTCEUR.SPOT', 'LTCUSD.SPOT',
				'LTCGBP.SPOT', 'LTCUST.SPOT', 'LTCCAD.SPOT',
				'LTCCHF.SPOT', 'BCHEUR.SPOT', 'BCHUSD.SPOT',
				'BCHGBP.SPOT', 'BCHUST.SPOT', 'BCHCAD.SPOT',
				'BCHCHF.SPOT', 'XRPEUR.SPOT', 'XRPUSD.SPOT',
				'XRPGBP.SPOT', 'XRPUST.SPOT', 'XRPCAD.SPOT',
				'XRPCHF.SPOT', 'XRPBTC.SPOT', 'EOSEUR.SPOT',
				'EOSUSD.SPOT', 'EOSCAD.SPOT', 'EOSUST.SPOT',
				'EOSCHF.SPOT'
		]
	}»

<br>

## requestForQuote
To make a request for quote:

<code>./bin/woorton requestForQuote --amount 1.0 --instrument BTCEUR.SPOT --direction buy</code>

Example response: 

	{
		client_request_id: 'someUUID',
		request_id: 'someID',
		price: 'someprice',
		total: 'sompeprice',
		amount: '1.0',
		instrument: 'BTCEUR.SPOT',
		direction: 'buy',
		created_at: '2020-01-31T08:59:40.269Z',
		order_type: null,
		expires_at: '2020-01-31T09:00:01.424Z',
		state: 'pending_confirmation'
	}

No trade is made at this point. To confirm the trade you need to invoque the "trade" command.

<code>./bin/woorton requestForQuote --amount 1.0 --instrument BTCEUR.SPOT --direction buy</code>

Example response: 


<br>

# FAQ

### Permission denied
If you have the following error:

	bash: ./bin/woorton: Permission denied

Change the permission with:

<code>chmod +x ./bin/woorton</code>