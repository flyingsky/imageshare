imageshare
==========

### Why

Most image hosting site provides space to store image/vedio. Why we don't use it as a image CDN for our small site. Then it's not necessary to store images in our site server. Actually most time the image share site also provides device tools to upload images, which is very easy for us to manage our image. Especially I want to deploy a site in CloudFoundry and use DocPad CMS.

### Where

Now it plans to support below image sharing site:

1. [PhotoBucket](http://photobucket.com) (TODO)
2. [Dropbox](http://dropbox.com)

### How to use it
1. Create your app in dropbox from [here](https://www.dropbox.com/developers/apps). Copy your app_key and app_secret to override my key in lib/token/index.js.
2. Click [here](https://www.dropbox.com/enable_public_folder) to Enable dropbox public folder. You also can find more detail from [here](https://www.dropbox.com/help/16/en).
2. Remove lib/token/token.json, rename lib/token/token_empty.json to lib/token.json.
3. Enter this project directory, and run `npm install` to install all dependencies.
4. Access [http://localhost:3000](http://localhost:3000), you will be asked to authrize access your dropbox app.

