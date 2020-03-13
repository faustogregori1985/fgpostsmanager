import React from "react";
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import flushPromises from 'flush-promises';
import axios from "axios";
import Overview from '../components/Overview';
import mockPosts from './posts.json';
afterEach(cleanup);

jest.mock('axios');

axios.get = jest.fn().mockResolvedValue({ data: {} })
axios.post = jest.fn().mockResolvedValue({
    data: { 
        id: '85',
        title: 'Maranello',
        content: '',
        image_url: '',
        updated_at: '',
        created_at: '',
        long: '',
        lat: ''
    }
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Post Overview', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });
    })
    it('should fetch post on render', async () => {
        const url = "https://wf-challenge-abqs4otg74.herokuapp.com/api/v1/posts";
        render(<Overview />);
        expect(mockedAxios.get).toHaveBeenCalledTimes(1)
        expect(mockedAxios.get).toHaveBeenCalledWith(url)
        
    });
    it('should render all post', async () => {
        const { getByTestId } = await render(<Overview />);
        await flushPromises();
        mockPosts.forEach(post =>  expect(getByTestId(`post-${post.id}`)).toBeInTheDocument());
    });
    
    it('should open the create post modal when the user click on "create Post"', async () => {
        const { getByTestId } = await render(<Overview />);
        fireEvent.click(getByTestId('header-create-post-button'))
        await flushPromises();
        expect(getByTestId('create-new-post')).toBeInTheDocument();
    });

    it('should create a new post when user click on "create"', async () => {
        const { getByTestId, getByText } = await render(<Overview />);
        fireEvent.click(getByText('Create Post'))
        await flushPromises();
        const title = getByTestId('post-title-input')
        fireEvent.change(title, { target: { value: 'Maranello' } })
        expect(title.value).toBe('Maranello')
        const content = getByTestId('post-content-textarea')
        fireEvent.change(content, { target: { value: 'Ferrari :)' } })
        expect(content.value).toBe('Ferrari :)');
        fireEvent.click(getByText('Create')); // create-new-post-save-button
        await flushPromises();
        expect(getByText('Maranello')).toBeInTheDocument();
    });
})