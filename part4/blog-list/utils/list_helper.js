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

const mostBlogs = (blogs) => {
	const authors = blogs.map((blog) => blog.author);
	const obj = {};
	authors.forEach((a) => {
		if (!Object.keys(obj).includes(a)) {
			obj[a] = 1;
		} else {
			obj[a] = obj[a] + 1;
		}
	});

	const authorWithMaxBlogs = Object.keys(obj).reduce((a, b) =>
		obj[a] > obj[b] ? a : b
	);

	return { author: authorWithMaxBlogs, blogs: obj[authorWithMaxBlogs] };
};

const mostLikes = (blogs) => {
	let authorsObj = {};
	blogs.forEach((blog) => {
		if (!Object.keys(authorsObj).includes(blog.author)) {
			authorsObj[blog.author] = blog.likes;
		} else {
			authorsObj[blog.author] += blog.likes;
		}
	});

	const authorWithMaxLikes = Object.keys(authorsObj).reduce((a, b) =>
		authorsObj[a] > authorsObj[b] ? a : b
	);

	return { author: authorWithMaxLikes, likes: authorsObj[authorWithMaxLikes] };
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
