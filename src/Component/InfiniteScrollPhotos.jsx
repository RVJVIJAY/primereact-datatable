import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const InfiniteScrollPhotos = () => {
    const [photos, setPhotos] = useState([]); // State to store photo data
    const [loading, setLoading] = useState(false); // State to track loading status
    const [page, setPage] = useState(1); // Page number for loading more photos
    const loadMoreRef = useRef(null); // Reference for the load more element

    useEffect(() => {
        // Function to fetch photos
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=100`);
                setPhotos((prev) => [...prev, ...response.data]); // Append new photos to existing state
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
            setLoading(false);
        };

        fetchPhotos(); // Fetch photos when component mounts or page changes
    }, [page]);

    useEffect(() => {
        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prev) => prev + 1); // Increment page to load more photos
            }
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current); // Observe the target element
        }

        // Cleanup function to unobserve the target element
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [loading]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Infinite Scroll Photos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {photos.map((photo) => (
                    <div key={photo.id} style={{ margin: '10px' }}>
                        <img src={photo.thumbnailUrl} alt={photo.title} style={{ width: '150px', height: '150px', borderRadius: '8px' }} />
                        <p style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {photo.title}
                        </p>
                    </div>
                ))}
            </div>
            <div ref={loadMoreRef} style={{ height: '20px', background: 'transparent' }} />
            {loading && <p>Loading more photos...</p>}
        </div>
    );
};

export default InfiniteScrollPhotos;

