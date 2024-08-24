import { useState, useEffect } from 'react';
import { onFindById } from '../config/api'; 

function useUserProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; 

    const fetchProfile = async () => {
      try {
        const profileData = await onFindById('perfiles', userId); 
        setProfile(profileData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}

export default useUserProfile;
