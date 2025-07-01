import { useEffect, useState } from 'react';
import axios from 'axios';

type Staff = {
  id: number;
  name: string;
  dateOfBirth: string;
  locationId: number;
};

function calculateAge(dob: string): number {
  const ageDiff = Date.now() - new Date(dob).getTime();
  const age = new Date(ageDiff).getUTCFullYear() - 1970;

  return age;
}

const StaffList = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/staff')
      .then((res) => {
        setStaffList(res.data);
      })
      .catch((err) => {
        console.error('Error fetching staff:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading staff...</p>;

  return (
    <div>
      <h1>Staff Directory</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Location ID</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{calculateAge(staff.dateOfBirth)}</td>
              <td>{staff.locationId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
