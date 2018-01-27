var express = require("express");
const app = express()
const header = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>YTNow</title><link rel="icon" href="https://image.ibb.co/gNzcxR/favicon.png" type="image/x-icon"><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"><style>.embed-container { position: relative; margin-top: 80px;padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style></head>'
const nav_bar = `<nav class="navbar navbar-fixed-top bg-inverse" role="navigation">
<div class="container">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>        

        <a class="navbar-brand" href="/">    
        YouTube Now</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav mr-auto"><li class="first"><a href="/">Home</a></li><li class="first"><a class="nav-link" title="Drag to bookmarks bar" href='javascript:(function(){  var yt_url = window.location.href ;var isyt = yt_url.indexOf("youtube.com");if (isyt != -1 && yt_url.indexOf("yt.now.sh") == -1){ yt_url = yt_url.replace("www.",""); ytnow_url = yt_url.replace("youtube.com", "yt.now.sh"); window.location = ytnow_url; }   else {alert ("Works with youtube.com only!");}   })();'>YTNow</a></li></ul>
    <form id="url_form" class="form-inline my-2 my-lg-0" style="padding-top:6px">
      <input id="yt_url" class="form-control mr-sm-2" type="text" placeholder="Youtube URL">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Now</button>
    </form>
    </div>
    <script>
    document.getElementById('url_form').addEventListener('submit', function(evt){
        evt.preventDefault();
        var url = document.getElementById("yt_url").value;
        url = url.replace("www.", "");
        url = url.replace("youtube.com", "yt.now.sh")
        window.location.href = url;
    });
    </script>
</div>
<!-- /.container -->
</nav>`
const body = '<body>' + nav_bar + '<div class="container"><div class="row"><div class="col-md-8 col-lg-8"><div class="video"><div class="embed-container">'
const ytembedpref = '<iframe src="' 
const ytembedsuff = '" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>'
const footer = "</div></div></div></div></div></body></html>"
app.use(express.static(__dirname + '/public'));
const ytdefault = "/FlsCjmMhFmw"

var status = 0;

var parse_url = function(ext){
    console.log("Status:" + ext)
    if(ext === undefined || ext=="/"){
        ext = ytdefault
    }
    ext = ext.replace('/watch?v=', '/');
    ext = ext.replace('/v/', '/');
    console.log("Ext:" + ext);
    let pref = "https://youtube.com/embed"
    let embed_url = pref + ext;
    let embed_iframe = ytembedpref + embed_url + ytembedsuff;
    return embed_iframe;
}
app.get('/*', (req, res) => {
    // let url = req.get('host')
    // let ext = req.originalUrl;
    // if(!ext){
    //     ext = ytdefault
    // }
    // ext = ext.replace('/watch?v=', '/');
    // ext = ext.replace('/v/', '/');
    // let pref = "https://youtube.com/embed"
    // let embed_url = pref + ext;
    // let embed_iframe = ytembedpref + embed_url + ytembedsuff;
    let embed_iframe = parse_url(req.originalUrl);
    console.log(embed_iframe);
    res.send(header + body + embed_iframe + footer)
    
})

app.listen(80, () => 
        console.log('YTNow App listening on port 80!')
)
