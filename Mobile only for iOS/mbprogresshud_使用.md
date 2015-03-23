##MBProgressHUD 使用

**声明的各种枚举类型**

```
typedef NS_ENUM(NSInteger, MBProgressHUDMode) {
	/** Progress is shown using an UIActivityIndicatorView. This is the default. */
	MBProgressHUDModeIndeterminate,
	/** Progress is shown using a round, pie-chart like, progress view. */
	MBProgressHUDModeDeterminate,
	/** Progress is shown using a horizontal progress bar */
	MBProgressHUDModeDeterminateHorizontalBar,
	/** Progress is shown using a ring-shaped progress view. */
	MBProgressHUDModeAnnularDeterminate,
	/** Shows a custom view */
	MBProgressHUDModeCustomView,
	/** Shows only labels */
	MBProgressHUDModeText
};
```


####默认形式

```
- (IBAction)showSimple:(id)sender {
	HUD = [[MBProgressHUD alloc] 		initWithView:self.navigationController.view];	
	[self.navigationController.view addSubview:HUD];
	//首先生成HUD实例对象，并添加（addSubview）
	
	HUD.delegate = self;
	//注册回调函数，我们可以及时将它清除掉
	
	[HUD showWhileExecuting:@selector(myTask) onTarget:self withObject:nil animated:YES];
	//开新线程来启动HUD，其中的myTask是一个函数，功能是睡眠3秒，需另行定义
}

- (void)myTask {
	// Do something usefull in here instead of sleeping ...
	sleep(3);
}
```



####默认形式 + 提示或内容
#####MBProgressHUDModeIndeterminate

<img src='http://images.cnitblog.com/blog/520696/201311/10102225-87cb7c3f7a314ff6903a51d09359688a.png' height='300px' >

```
- (IBAction)showTextDialog:(id)sender {    
    HUD = [[MBProgressHUD alloc] initWithView:self.view];
    [self.view addSubview:HUD];
	//生成对象HUD
    HUD.dimBackground = YES;  //把当前的view置于后台
	//添加内容
    HUD.labelText = @"请稍等";
    //显示对话框，设定显示时间
    [HUD showAnimated:YES whileExecutingBlock:^{
		//显示3秒，可以通过另行声明函数来以参数形式插入
        sleep(3);
    } completionBlock:^{
    }];
}

```

####圆饼状加载提示框（请允许我实在不知道该怎么形容）
#####MBProgressHUDModeDeterminate
<img src='http://images.cnitblog.com/blog/520696/201311/10102529-2dcd42615a96449597de0ea0b5b6cf23.png' height='200px'>

```
- (IBAction)showWithLabelDeterminate:(id)sender {
	
	HUD = [[MBProgressHUD alloc] initWithView:self.navigationController.view];
	[self.navigationController.view addSubview:HUD];
	
	// 设置类型为饼状进度条，枚举类型1
	HUD.mode = MBProgressHUDModeDeterminate;
	//下面两行不想废话了	
	HUD.delegate = self;
	HUD.labelText = @"载入中4";
	
	//myProgressTask就在下面，不废话就是显示五秒钟动画
	[HUD showWhileExecuting:@selector(myProgressTask) onTarget:self withObject:nil animated:YES];
}
- (void)myProgressTask {
	// This just increases the progress indicator in a loop
	float progress = 0.0f;
	while (progress < 1.0f) {
		progress += 0.01f;
		HUD.progress = progress;
		usleep(50000);
	}
}

```

####圈状进度条（命名能力太差）
#####MBProgressHUDModeAnnularDeterminate
<img src='http://images.cnitblog.com/blog/520696/201311/10102634-bf24ae243b8e45c98e7170ff1ddb70d6.png' height='200px'>

```
- (IBAction)showWIthLabelAnnularDeterminate:(id)sender {
	HUD = [[MBProgressHUD alloc] initWithView:self.navigationController.view];
	[self.navigationController.view addSubview:HUD];
	
	//设定为圈状进度条，其实就是枚举类型里的3 
	HUD.mode = MBProgressHUDModeAnnularDeterminate;
	
	HUD.delegate = self;
	HUD.labelText = @"载入中5";
	
	// myProgressTask uses the HUD instance to update progress
	[HUD showWhileExecuting:@selector(myProgressTask) onTarget:self withObject:nil animated:YES];
}
//myProgressTask上面有写过了
```

####条状进度条
#####MBProgressHUDModeDeterminateHorizontalBar
<img src='http://images.cnitblog.com/blog/520696/201311/10102721-34d44e1d907d4e0788d36e99bf4f0ea3.png' height='200px'>

```
- (IBAction)showProgressThree:(id)sender {    
    HUD = [[MBProgressHUD alloc] initWithView:self.view];
    [self.view addSubview:HUD];
    
    HUD.labelText = @"正在加载";
    //枚举类型2
    HUD.mode = MBProgressHUDModeDeterminateHorizontalBar;
    [HUD showAnimated:YES whileExecutingBlock:^{
        
        float progress = 0.0f;
        while (progress < 1.0f) {
            progress += 0.01f;
            HUD.progress = progress;
            usleep(5000);
        }
    } completionBlock:^{
    	//自动销毁喽。。。。。。
        [HUD removeFromSuperview];
        [HUD release];
        HUD = nil;
        
    }];

}
```

####对号标示符
#####MBProgressHUDModeCustomView
<img src='http://images.cnitblog.com/blog/520696/201311/10102912-daa24fac562849f59cbae86e19e1843e.png' height='200px'>

```
- (IBAction)showCustomDialog:(id)sender {
    HUD = [[MBProgressHUD alloc] initWithView:self.view];
    [self.view addSubview:HUD];    
    HUD.labelText = @"操作成功";
    //枚举类型4
    HUD.mode = MBProgressHUDModeCustomView;
    HUD.customView = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"Checkmark"]] autorelease];
    [HUD showAnimated:YES whileExecutingBlock:^{
        sleep(2);
    } completionBlock:^{
        [HUD removeFromSuperview];
        [HUD release];
        HUD = nil;
    }];
}
```

####纯文本提示框
#####MBProgressHUDModeText
<img src='http://images.cnitblog.com/blog/520696/201311/10102957-35c552f77157414fa0feb782f8432f60.png' height='200px'>

```
- (IBAction)showAllTextDialog:(id)sender {   
    
    HUD = [[MBProgressHUD alloc] initWithView:self.view];
    [self.view addSubview:HUD];
    
    HUD.labelText = @"操作成功";
    //枚举类型5
    HUD.mode = MBProgressHUDModeText;
    HUD.customView = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"Checkmark"]] autorelease];
    [HUD showAnimated:YES whileExecutingBlock:^{
        sleep(2);
    } completionBlock:^{
        [HUD removeFromSuperview];
        [HUD release];
        HUD = nil;
    }];
    
}

```
