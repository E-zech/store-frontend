import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { GeneralContext } from '../../App';
import { useResolvedPath } from 'react-router-dom';
import { Search, SearchIconWrapper, SearchIconWrapperStyle, SearchStyle, StyledInputBase, StyledInputBaseStyle, searchWrapper, searchWrapperStyle } from './SearchBar.style';
import { selectColor } from '../../css/Main.style';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const { setProducts, initialProducts, mode } = useContext(GeneralContext);
    const path = useResolvedPath().pathname;

    const colorInput = {
        color: mode === 'dark' ? 'white' : 'black'
    };

    const handleChange = (value) => {
        const lowercaseValue = value.toLowerCase().trim();
        setSearchValue(value);
        const searchProducts = initialProducts.filter(p => p.title.toLowerCase().includes(lowercaseValue));
        setProducts(searchProducts);
    };

    const handleClear = () => {
        setSearchValue('');
        setProducts(initialProducts);
    };

    useEffect(() => {
        handleClear();
    }, [path]);

    return (
        <Box sx={searchWrapper}>
            <Search sx={{
                color: colorInput,
                backgroundColor: selectColor,
                '@media (max-width: 560px)': {
                    color: colorInput,
                    backgroundColor: mode === 'dark' ? '#646464' : '#ebf5f4',
                },
            }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(ev) => handleChange(ev.target.value)} />
            </Search>
        </Box>
    );
}
