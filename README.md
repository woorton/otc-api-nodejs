READ ME:

Woorton API Implementation In Node JS

Important: By default we use sandbox link, if you wan to use the prod, you could change that in common.ts file ( his directory is /woorton/src/api/ ) and connect.ts file ( his directory is /woorton/src/api/websocket/ )


Prerequisites: 

You need to install: 

- First : Node Js ( follow this link https://nodejs.org/en/download/ ) this came with NPM

- Secondly: Homebrew (
		- For Mac OS follow this link :  https://treehouse.github.io/installation-guides/mac/homebrew
		- For Windows and Linus OS follow this link: https://docs.brew.sh/Homebrew-on-Linux )

- Finally Yarn with Homebrew ( follow this link https://legacy.yarnpkg.com/fr/docs/install/  )


Build The Project:

Once these three modules have been installed, first of all open the terminal and go to the directory of the file:

Once you are on the directory, enter these commands in order :
	«npm install » :  this will install all the packages necessary for the proper functioning of the API and build the bundle ( Do this only 				   the first time you want to build the project, so this will not be necessary for the next time you want to build )	«yarn build » :  this will build the bundle.
	«yarn watch » ( optional ) :if you want to modify something in the code (fix for example the values of your variables), this will allow 						 you to build your bundle simultaneously, so you will no longer be forced to type "yarn build" each time you modify the code.


Use Of The Cli:

Dictionary:
	prefixForCommand:  «./bin/woorton» 

Open the terminal and enter this first : 
	-  «./bin/woorton» : this will display all the commands (connection to Endpoints and WebSocket) available for this API.
	you should see something like that :

		« Options:
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
  					getLevels [options] »
					
 - When you want to use one command; get Instruments for example, just enter in the terminal :  «./bin/woorton getInstruments» and you will see the Instruments. You should see something like that : 

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


	- Where you see «  [options] » in front of command, just tap  the prefixForCommand, add Command and put this « --help » at the end to see how you can execute the wright way the command for example:  
		if you enter this: «./bin/woorton getLedger --help», you will see something like that:

		« Usage: woorton getLedger [options]

		   Options:
 		   --page [page]          
 		   --per_page [per_page]  
  		   -h, --help             output usage information »

	Example of command with options:
	If you want a make a request for quote you should enter this: "./bin/woorton requestForQuote --amount 1.0 --instrument BTCEUR.SPOT --direction buy"
	You should see something like this :

			{
  				client_request_id: '7bd62767e7990307e3749f37f09e318f',
  				request_id: 'cc5563b2-759a-4c69-9550-1f5dcff7c369',
 				price: '8503.2948',
  				total: '8503.29',
  				amount: '1.0',
  				instrument: 'BTCEUR.SPOT',
  				direction: 'buy',
  				created_at: '2020-01-31T08:59:40.269Z',
  				order_type: null,
 				expires_at: '2020-01-31T09:00:01.424Z',
  				state: 'pending_confirmation'
			}

	For more informations of the use of the API, follow this link : https://docs.woorton.com/#tag/History/paths/~1trades/get
