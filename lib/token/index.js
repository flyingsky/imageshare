/**
 * User: ramon
 * Date: 2/25/13 1:15 PM
 */


//PhotoBucket: http://pic.pbsrc.com/dev_help/WebHelpPublic/PhotobucketPublicHelp.htm
//API key is: 149833743
//API private key is: 26c79ff888f6fb26301dd525df3b4663

var dbox = require("dbox").app({"app_key": "ynfdncb7aiz38wr", "app_secret": "7af1w1cnbmawpyj"});

var token = {
   STEP_REQUEST_TOKEN: 0,
   STEP_DO_REQUEST_TOKEN: 1,
   STEP_ACCESS_TOKEN: 2,
   STEP_FINISHED: 3,

   PUBLIC_DIR: 'Public',

   provider: null,
   metaReqOption: {root: "dropbox"},

   requestToken: null,
   accessToken: null,

   step: 0,
   client: null,

   publicUrl: null,

   handler: function(req, res) {
      var me = token;
      console.log('hello: this.step=' + me.step);

      if (me.accessToken) {
         me.step = me.STEP_FINISHED;
      } else {
         if (req.body.hasOwnProperty('step')) {
            me.step = parseInt(req.body.step);
            me.step++;
         } else if (me.requestToken) {
            me.step = me.STEP_ACCESS_TOKEN;
         }
      }

      switch(me.step) {
         case me.STEP_REQUEST_TOKEN:
            me.showRequestTokenPage(req, res);
            break;
         case me.STEP_DO_REQUEST_TOKEN:
            me.getRequestToken(req, res);
            break;
         case me.STEP_ACCESS_TOKEN:
            me.getAccessToken(req, res);
            break;
         default:
            me.showAccount(req, res);
      }
   },

   showRequestTokenPage: function(req, res) {
      res.render('token', {
         provider: this.provider,
         step: this.STEP_REQUEST_TOKEN,
         submitText: 'get request token'
      });
   },

   showAccount: function(req, res) {
      console.log(this.accessToken);

      var client = this.createClient();

      client.account(function(status, result){
         var data = '<h1>You have got access token</h1>';
         data += '<p>' + JSON.stringify(result, null, 2) + '</p>';
         res.send(data);
      });
   },

   createClient: function() {
      if (!this.client) {
         this.client = dbox.client(this.accessToken);
      }
      return this.client;
   },

   save: function() {
      // save token into token.json
      var fs = require('fs');
      var file = __dirname + '/token.json';

      var myToken = {
         dropbox: this.accessToken
      };

      fs.writeFile(file, JSON.stringify(myToken, null, 4), function (err) {
         if (err) {
            console.log('Error: ' + err);
            return;
         }

         console.log('saved token: ' + JSON.stringify(myToken, null, 4));
      });
   },

   init: function() {
      // load token from token.json
      var savedToken = require('./token.json');
      if (savedToken) {
         this.accessToken = savedToken.dropbox;
         this.updatePublicUrl();
         this.createClient();
      }
      this.step = this.accessToken ? this.STEP_FINISHED : this.STEP_REQUEST_TOKEN;
      console.log(savedToken);
      console.log(this.step);
   },

   updatePublicUrl: function() {
      this.publicUrl = "http://dl.dropbox.com/u/" + this.accessToken.uid;
   },

   getRequestToken: function(req, res) {
      var me = this;
      dbox.requesttoken(function(status, requestToken){
         console.log(requestToken);
         me.requestToken = requestToken;
         res.redirect(requestToken.authorize_url + '&oauth_callback=' + encodeURIComponent('http://localhost:3000/token?step=' + me.STEP_DO_REQUEST_TOKEN));
      });
   },

   getAccessToken: function(req, res) {
      var me = this;
      dbox.accesstoken(me.requestToken, function(status, accessToken){
         console.log(accessToken)
         me.accessToken = accessToken;
         me.step = me.STEP_ACCESS_TOKEN;
         me.updatePublicUrl();
         me.createClient();
         me.save();
         res.redirect('/token?step=' + me.step);
      });
   }
};

token.init();

module.exports = token;