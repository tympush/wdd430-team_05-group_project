"use client";

import React, { useState } from 'react';

type UserRow = { id: string; username: string; email: string; account_type: string };

export default function ManageUsersClient({ initialUsers }: { initialUsers: UserRow[] }) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers ?? []);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function updateType(id: string, account_type: string) {
    setSavingId(id);
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, account_type }),
      });
      if (!res.ok) throw new Error('Update failed');
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, account_type } : u)));
    } catch (err) {
      console.error(err);
      alert('Failed to update user');
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="px-2 py-2">Username</th>
            <th className="px-2 py-2">Email</th>
            <th className="px-2 py-2">Account Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-2 py-3">{u.username}</td>
              <td className="px-2 py-3">{u.email}</td>
              <td className="px-2 py-3">
                <select value={u.account_type} onChange={(e) => updateType(u.id, e.target.value)} disabled={savingId === u.id} className="rounded border px-2 py-1">
                  <option value="user">user</option>
                  <option value="seller">seller</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
