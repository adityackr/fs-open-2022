const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((sum, blog) => {
				return sum + blog.likes;
		  }, 0);
};

const favoriteBlog = (blogs) => {
	let likes = 0;
	let blogObj = null;

	blogs.forEach((blog) => {
		if (blog.likes > likes) {
			likes = blog.likes;
			blogObj = {
				title: blog.title,
				author: blog.author,
				likes: blog.likes,
			};
		}
	});
	return blogObj;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
