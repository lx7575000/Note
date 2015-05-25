#C标准库<string.h>中的strstr函数实现
###2015-05-24

```
LeetCode
int strStr(char* haystack, char* needle) {
    if(strlen(needle) == 0)//当想要匹配的模板字符串为空
        return 0;
    if(strlen(haystack) == 0 || strlen(needle) > strlen(haystack)) //当给的要匹配的目标比源串还长时候
        return -1;
    
    for(int i = 0; ; i++){
    	//每次没有匹配成功，就跳出内层循环，然后j就会从0重新开始。
        for(int j = 0; ; j++){
            if(j == strlen(needle))
                return i;
            if(i + j == strlen(haystack))
            //如果i+j都等于了要求匹配串的长度都没匹配成功，则必然就没机会了。
            //因为此时j尚未达到needle串的最大长度，所以可以肯定源串后面已经不够再进行全部匹配了。
                return -1;
            if(needle[j] != haystack[i + j])
            //没有匹配上就跳出。否则就以i为固定点，后面添加j位来逐一进行匹配。
                break;
        }
    }
}
```

```
C Standard Libary

//作用是发现在源串中首个匹配字符的位置
char *(strchr)(const char *s, int c)
{
	const char ch = c;
	
	for(; *s != ch; s++){
		if(*s == '\0')
			return NULL;
		return ((char *) s);
	}
}

char *(strstr)(const char *s1, const char *s2){
	if(*s2 == '\0')
		return ((char *) s1);
		//当目标串长度为0
	
	for(; (s1 = strchr(s1, *s2)) != NULL; s1++)
	//从s1中查找复合要求的首个字符位置，如果没有就另s1位置向后移动一位，然后就可以放过原来匹配的那个位置重新进行向后的查找。
	{
		const char *sc1, *sc2;
		
		for(sc1 = s1, sc2 = s2; ; )
		{
			if(*++sc2 == '\0')
			{
				//因为第一次已经排除掉s2长度为0的状况，此时就是明显查找到最终情况。
				return ((char *)s1);
			}
			else if(*++sc1 != *sc2)
			{
				//如果有没有匹配的状况,就跳出，进行下一轮匹配判断操作
				break;
			}
		}
	}
	break;
}
```