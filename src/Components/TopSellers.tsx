import React, { useEffect, useState } from 'react';

interface Author {
    name: string;
    isFollowing: boolean;
    image: string;
}

const TopSellers = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://randomuser.me/api/?results=5");
                const data = await res.json();
                const authorsData: Author[] = data.results.map((user: any) => ({
                    name: `${user.name.first} ${user.name.last}`,
                    isFollowing: false,
                    image: user.picture.medium
                }));
                setAuthors(authorsData); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleFollowClick = (index: number) => {
        setAuthors((prevAuthors) => 
            prevAuthors.map((author, i) => 
                i === index ? { ...author, isFollowing: !author.isFollowing } : author
            )
        );
    };

    return (
        <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-5 text-center">Top Sellers</h2>
            <ul>
                {authors.map((author, index) => (
                    <li key={index} className="mb-4">
                        <section className="flex items-center justify-between">
                            <img src={author.image} alt={author.name} className="w-16 h-16 rounded-full" />
                            <span className="ml-4 text-lg font-medium">{author.name}</span>
                            <button
                                onClick={() => handleFollowClick(index)}
                                className={`py-2 px-4 rounded ${
                                    author.isFollowing ? "bg-black text-white" : "bg-gray-300 text-gray-700"
                                } hover:bg-black hover:text-white transition-colors duration-300`}
                            >
                                {author.isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        </section>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSellers;
