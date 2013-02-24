imageshare
==========

### Why

Most image hosting site provides space to store image/vedio. Why we don't use it as a image CDN for our small site. Then it's not necessary to store images in our site server. Actually most time the image share site also provides device tools to upload images, which is very easy for us to manage our image. Especially I want to deploy a site in CloudFoundry and use DocPad CMS.

### Where

Now it plans to support below image sharing site:

1. [PhotoBucket](http://photobucket.com)
2. [Dropbox](http://dropbox.com) (Do we need support this? Now public folder is removed, we cannot use the public url)

### How

1. General API to get all images/folder information
2. Abstract provider to adapter different image hosting API
