module("parentPath")
test("gets a parent path", function(){
	var result1 = Util.getParentPath("path/to/file.ext");
	equal(result1, "path/to", "got path of file");
	
	var result2 = Util.getParentPath("path/to/nextpath");
	equal(result2, "path/to", "got path of path");
	
	var result3 = Util.getParentPath("path/to/nextpath/");
	equal(result3, "path/to", "got path of path with trailing slash");
});
test("gets default path if empty", function(){
	var result1 = 	Util.getParentPath("");
	equal(result1, "", "got default path of empty string");
	
	var result2 = Util.getParentPath(undefined);
	equal(result2, "", "got default path of undefined");
	
	var result3 = Util.getParentPath(null);
	equal(result3, "", "got default path of null");
});
test("gets trailing slash if trailing slash set", function(){
	var result1 = Util.getParentPath("", true);
	equal(result1, "/", "got default path of empty string");
	
	var result2 = Util.getParentPath("file.ext", true);
	equal(result2, "/", "got default path of null");
	
	var result3 = Util.getParentPath("path/to/nextpath", true);
	equal(result3, "path/to/", "got path of path");
});
test("gets default path if no more", function(){
	var result1 = Util.getParentPath("/");
	equal(result1, "", "got default path of /");
	
	var result2 = Util.getParentPath("file.ext");
	equal(result2, "", "got default path of file");
	
	var result3 = Util.getParentPath("/path");
	equal(result3, "", "got default path of a path");
});