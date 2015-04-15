#Node.JS 参数的GET和POST
###2015-04-13

通过URL传入参数，我们使用`req.param.变量名`的格式来接收到参数。		
发出参数则是使用`req.body.变量名`的格式来接受参数。

##接收参数
###接受多参数
如果想要同时接受多个参数，可以通过**http://example.com/api/users?id=4&token=sdfa3&geo=us**的格式来拿到参数。

id  | 4
------------- | -------------
token  | sdfa3
geo| us

**参数通过`req`来传递。**

```
app.get('/api/users', function(req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

  res.send(user_id + ' ' + token + ' ' geo);
});

```

###接收单个参数
如果我们只需要接收一个参数，我们可以通过`/api/:id`的方式来完成，虽然也可以通过该方法同时接受多个参数，但是用于接收单参数更推荐该方法。简单明了。

```
app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
  });
```

###路由参数中间件
正如我上篇文章写的，有些传入参数，可以通过中间件来进行格式变换或者进行修改。下面我们就用实例进行说明。

```
app.param('name', function(req, res, next, name) {
    var modified = name + '-dude';

    // save name to the request
    req.name = modified;

    next();
});
app.get('/api/users/:name', function(req, res) {
    // the user was found and is available in req.user
    res.send('What is up ' + req.name + '!');
});
```

我通过中间件在传入的数据后面加入'-dude'，然后再通过`next()`跳出执行后面操作。将该数据输出出来。

##发送数据
为了能够发送数据，我们需要通过`npm`再下载个模块**body-parser**。

```
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
```

```
app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});
```