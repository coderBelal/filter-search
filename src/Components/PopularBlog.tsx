interface Blog {
    title: string;
    author: string;
    likes: number;
    comments: number;
}

const PopularBlog = () => {
    const blogs: Blog[] = [
        { title: 'My Amazing Blog Title 1', author: 'Jordan', likes: 142, comments: 44 },
        { title: 'My Amazing Blog Title 2', author: 'John', likes: 153, comments: 25 },
        { title: 'My Amazing Blog Title 3', author: 'Mark', likes: 140, comments: 44 },
        { title: 'My Amazing Blog Title 4', author: 'Alex', likes: 123, comments: 25 },
    ];

    return (
        <div className="bg-white p-5 mx-5 mt-5 border w-[23rem] rounded shadow-lg">
            <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
            <ul>
                {blogs.map((blog, index) => (
                    <li key={index} className="mb-4">
                        <h3 className="text-lg font-medium">{blog.title}</h3>
                        <p className="text-sm text-gray-600">Publish by {blog.author}</p>
                        <div className="flex items-center mt-2 text-gray-600">
                            <div className="flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15a7 7 0 007 7 7 7 0 007-7v-4a7 7 0 00-7-7H7a7 7 0 00-7 7v4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10h.01" />
                                </svg>
                                <span>{blog.likes}</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8h1a4 4 0 004-4V8a4 4 0 00-4-4H7a4 4 0 00-4 4v8a4 4 0 004 4z" />
                                </svg>
                                <span>{blog.comments}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularBlog;
