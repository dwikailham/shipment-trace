'use client'

import { TextField, Autocomplete } from '@mui/material';
import { COURIER_LIST } from '@/constants'
import { TListDropdown } from '@/types'


type TProps = {
    courirSelected: TListDropdown | null
    handleSelected: (val: TListDropdown | null) => void
    disabled: boolean
}

export default function Index(props: TProps) {
    /** Params */
    const { courirSelected, handleSelected, disabled } = props
    return (
        <Autocomplete
            options={COURIER_LIST}
            getOptionLabel={(option) => option.label}
            fullWidth
            disabled={disabled}
            value={courirSelected}
            onChange={(_, newValue) => {
                handleSelected(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Courier" />}
        />
    );
}
