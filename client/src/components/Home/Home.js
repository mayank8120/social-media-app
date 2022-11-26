import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid, Paper, TextField, Button } from '@material-ui/core';

import useStyles from './styles';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import { getPostBySearch, getPosts } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();

    const query = useQuery();
    const history = useHistory();
    const page = query.get('page');
    const searchQuery = query.get('searchQuery');



    const [tags, settags] = useState([]);
    const [search, setsearch] = useState('');

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {

        }
    };

    const handleAddChip = (tag) => {
        settags([...tags, tag]);
    }

    const handleDeleteChip = (tagTODelete) => {
        settags(tags.filter((tag) => tag !== tagTODelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }
    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField
                                    onKeyDown={handleKeyPress}
                                    name="search" variant="outlined"
                                    label="Search Memories" fullWidth
                                    value={search}
                                    onChange={(e) => setsearch(e.target.value)}
                                />
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={
                                        (chip) => handleAddChip(chip)
                                    }
                                    onDelete={
                                        (chip) => handleDeleteChip(chip)
                                    }
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button
                                    onClick={searchPost}
                                    className={classes.searchButton} variant="contained" color="primary">Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (
                                <Paper className={classes.pagination} elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home