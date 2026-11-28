
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';

import {
    fetchUsers,
    updateRole,
    fetchRoles
} from '../features/auth/authSlice';

import { useDispatch, useSelector } from 'react-redux';

const UserRoleForm = () => {

    const {
        users,
        status,
        roles,
        rolesStatus,
        error
    } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [data, setData] = useState({
        id: '',
        role: ''
    });

    const [updating, setUpdating] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Fetch roles
    useEffect(() => {
        if (rolesStatus === 'idle') {
            dispatch(fetchRoles());
        }
    }, [rolesStatus, dispatch]);

    // Fetch users
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    // Handle changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));

        setSubmitError('');
    };

    // Submit role assignment
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitError('');

        if (!data.id || !data.role) {
            setSubmitError('Please select both a user and a role.');
            return;
        }

        try {
            setUpdating(true);

            await dispatch(updateRole({
                id: data.id,
                role: data.role
            })).unwrap();

            setData({
                id: '',
                role: ''
            });

        } catch (err) {
            setSubmitError(
                err?.message || err || 'Unable to update user role'
            );
        } finally {
            setUpdating(false);
        }
    };

    // Loading
    if (status === 'loading' || rolesStatus === 'loading') {
        return (
            <div className="role-loading">
                <div className="role-spinner"></div>
                <p>Loading users and roles...</p>
            </div>
        );
    }

    // Error
    if (status === 'failed' || rolesStatus === 'failed') {
        return (
            <div className="role-error">
                {error?.message || error || 'Unable to load data'}
            </div>
        );
    }

    return (
        <div className="role-page">

            <div className="role-card">

                {/* Header */}
                <div className="role-header">

                    <div className="role-logo-wrapper">
                        <img
                            src={logo}
                            alt="Logo"
                            className="role-logo"
                        />
                    </div>

                    <h2>Assign User Role</h2>

                    <p>
                        Manage user permissions by assigning
                        appropriate roles to registered users.
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="role-form">

                    <div className="role-field">

                        <label htmlFor="id">
                            Select User
                        </label>

                        <select
                            id="id"
                            name="id"
                            value={data.id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Choose a user
                            </option>

                            {users?.map(userItem => (
                                <option
                                    key={userItem.id}
                                    value={userItem.id}
                                >
                                    {userItem.name} ({userItem.email})
                                </option>
                            ))}
                        </select>

                        <small>
                            Select the account you want to update.
                        </small>

                    </div>

                    <div className="role-field">

                        <label htmlFor="role">
                            Select Role
                        </label>

                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Choose a role
                            </option>

                            {roles?.map(role => (
                                <option
                                    key={role.id}
                                    value={role.id}
                                >
                                    {role.name}
                                </option>
                            ))}
                        </select>

                        <small>
                            Choose the permissions level for this user.
                        </small>

                    </div>

                    {submitError && (
                        <div className="role-submit-error">
                            {submitError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={
                            updating ||
                            !data.id ||
                            !data.role
                        }
                    >
                        {updating ? (
                            <>
                                <span className="button-spinner"></span>
                                Updating Role...
                            </>
                        ) : (
                            'Assign Role'
                        )}
                    </button>

                </form>

                <div className="role-footer">
                    <span>Secure User Management</span>
                </div>

            </div>

        </div>
    );
};

export default UserRoleForm;
