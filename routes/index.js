
/*
 * GET home page.
 */

var token = require('../lib/token');

exports.index = function(req, res){
   if (!token.client) {
      token.handler(req, res);
   } else {
      token.client.metadata('Public', token.metaReqOption, function(status, reply){
         console.log(reply);

         var result = reply;

         var contents = result.contents;
         var images = [];
         contents.forEach(function(content){
            console.log(content);
            if (!content.is_dir && content.mime_type.indexOf('image') == 0) {
               var href = token.publicUrl + content.path.replace("/Public", '');
               images.push({href:href});
            }
         });


         res.render('index', {
            title: 'Express',
            response: JSON.stringify(reply),
            images: images
         });
      });
   }
};