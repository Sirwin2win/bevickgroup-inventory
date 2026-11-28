
import React, { useEffect, useState } from 'react';

import {
    fetchUsers,
    updateUserStatus,
    fetchRoles,
    updateRole
} from '../features/auth/authSlice';

import { useDispatch, useSelector } from 'react-redux';

const AllUsers = () => {

    const {
        users = [],
        status,
        error,
        roles = [],
        rolesStatus
    } = useSelector(state => state.auth);
    console.log(roles)
    console.log(users)

    const dispatch = useDispatch();

    const [updatingId, setUpdatingId] = useState(null);
    const [updatingRoleId, setUpdatingRoleId] = useState(null);

    const [updateError, setUpdateError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch users
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    // Fetch roles
    useEffect(() => {
        if (rolesStatus === 'idle') {
            dispatch(fetchRoles());
        }
    }, [rolesStatus, dispatch]);

    // Update user status
    const handleStatusChange = async (user) => {

        setUpdateError('');
        setSuccessMessage('');

        const newStatus =
            user.status?.toLowerCase() === 'active'
                ? 'inactive'
                : 'active';

        try {

            setUpdatingId(user.id);

            await dispatch(updateUserStatus({
                id: user.id,
                status: newStatus
            })).unwrap();

            setSuccessMessage(
                `${user.name}'s status updated to ${newStatus}.`
            );

            await dispatch(fetchUsers());

        } catch (err) {

            setUpdateError(
                err?.message || err || 'Unable to update user status.'
            );

        } finally {

            setUpdatingId(null);

        }
    };

    // Update user role
    const handleRoleChange = async (user, newRoleId) => {

        if (!newRoleId || String(newRoleId) === String(user.role?.id || user.role)) {
            return;
        }

        setUpdateError('');
        setSuccessMessage('');

        try {

            setUpdatingRoleId(user.id);

            await dispatch(updateRole({
                id: user.id,
                role: newRoleId
            })).unwrap();

            setSuccessMessage(
                `${user.name}'s role updated successfully.`
            );

            await dispatch(fetchUsers());

        } catch (err) {

            setUpdateError(
                err?.message || err || 'Unable to update user role.'
            );

        } finally {

            setUpdatingRoleId(null);

        }
    };

    // Loading
    if (
        (status === 'loading' && users.length === 0) ||
        (rolesStatus === 'loading' && roles.length === 0)
    ) {
        return (
            <div className="role-loading">
                <div className="role-spinner"></div>
                <p>Loading users and roles...</p>
            </div>
        );
    }

    // Error
    if (status === 'failed' && users.length === 0) {
        return (
            <div className="role-error">
                {error?.message || error || 'Unable to load users.'}

                <button onClick={() => dispatch(fetchUsers())}>
                    Retry
                </button>
            </div>
        );
    }

    return (

        <div className="responsive-table-container">

            {/* HEADER */}

            <div className="table-heading">

                <div>
                    <h2>Users Management</h2>
                    <p>Manage users, permissions and account status.</p>
                </div>

                <span className="table-count">
                    {users.length} Users
                </span>

            </div>

            {/* MESSAGES */}

            {successMessage && (
                <div className="table-success-message">
                    {successMessage}
                </div>
            )}

            {updateError && (
                <div className="table-error-message">
                    {updateError}
                </div>
            )}

            {rolesStatus === 'failed' && (
                <div className="table-error-message">
                    Unable to load available roles.
                    <button onClick={() => dispatch(fetchRoles())}>
                        Retry
                    </button>
                </div>
            )}

            {/* TABLE */}

            <div className="responsive-table-wrapper">

                <table className="responsive-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email Address</th>
                            <th>Assigned Role</th>
                            <th>Account Status</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.length > 0 ? (

                            users.map((user, index) => {

                                const isActive =
                                    user.status?.toLowerCase() === 'active';

                                const isUpdating =
                                    updatingId === user.id;

                                const isUpdatingRole =
                                    updatingRoleId === user.id;

                                const currentRoleId =
                                    user.role?.id || user.role || '';

                                return (

                                    <tr key={user.id}>

                                        <td>{index + 1}</td>

                                        {/* USER */}

                                        <td>
                                            <div className="table-user">

                                                <div className="user-avatar">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>

                                                <span>{user.name}</span>

                                            </div>
                                        </td>

                                        {/* EMAIL */}

                                        <td>{user.email}</td>

                                        {/* CURRENT ROLE */}

                                        <td>
                                            <span className="role-badge">
                                                {user.roles?.[0].name || 'No Role'}
                                            </span>
                                        </td>

                                        {/* STATUS */}

                                        <td>
                                            <span className={
                                                isActive
                                                    ? 'user-status active-status'
                                                    : 'user-status inactive-status'
                                            }>
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* CHANGE ROLE */}

                                        <td>

                                            <select
                                                className="role-select"
                                                value={currentRoleId}
                                                disabled={
                                                    isUpdatingRole ||
                                                    rolesStatus !== 'succeeded'
                                                }
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="" disabled>
                                                    Select Role
                                                </option>

                                                {roles.map(role => (

                                                    <option
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        {role.name}
                                                    </option>

                                                ))}

                                            </select>

                                            {isUpdatingRole && (
                                                <small className="role-updating">
                                                    Updating...
                                                </small>
                                            )}

                                        </td>

                                        {/* STATUS ACTION */}

                                        <td>

                                            <button
                                                type="button"
                                                className={
                                                    isActive
                                                        ? 'table-action deactivate-action'
                                                        : 'table-action activate-action'
                                                }
                                                onClick={() =>
                                                    handleStatusChange(user)
                                                }
                                                disabled={
                                                    updatingId !== null ||
                                                    updatingRoleId !== null
                                                }
                                            >

                                                {isUpdating
                                                    ? 'Updating...'
                                                    : isActive
                                                        ? 'Deactivate'
                                                        : 'Activate'
                                                }

                                            </button>

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>
                                <td colSpan="7" className="empty-table">
                                    No users found.
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default AllUsers;
