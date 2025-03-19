"use client"
/** React Imports */
import { useCallback, useState } from 'react'

/** MUI Imports */
import { Typography, TextField, Button, Stack, CircularProgress, Card, CardContent, Grid2, Divider, Chip, Snackbar, Alert, InputAdornment, IconButton } from '@mui/material';
import { AutoCompleteComponent, EmptyState } from '@/components'
import { IApiResponseWayBill, TListDropdown } from '@/types'
import { LocalShipping, Telegram, Search, Place, FiberManualRecord, Inventory2, History, Info, Close } from '@mui/icons-material';
import { useGetWayBill } from '@/hooks'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import useScrollTrigger from '@mui/material/useScrollTrigger'

export default function Home() {

  /** States */
  const [courirSelected, setCourierSelected] = useState<TListDropdown | null>(null);
  const [numberResi, setNumberResi] = useState<string>('')
  const [stateSnackBar, setStateSnackBar] = useState({
    open: false,
    title: ''
  })
  const [wayBill, setWayBill] = useState<IApiResponseWayBill | null>(null);

  /** Mutations */
  const { mutateAsync, isPending } = useGetWayBill()

  /** Functions */
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50
  })

  const handleSelected = useCallback((val: TListDropdown | null) => {
    setCourierSelected(val)
  }, [])

  const handleChangeResi = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberResi(e.target.value)
  }

  const onHandleTrace = useCallback(() => {
    const params = {
      awb: numberResi,
      courier: courirSelected?.code || ''
    }

    mutateAsync({ ...params }, {
      onSuccess(data) {
        if (data) {
          setWayBill(data)
        }

      },
      onError(error) {
        const response: IApiResponseWayBill = error.response?.data as IApiResponseWayBill;
        setStateSnackBar({
          open: true,
          title: response.meta.message || ''
        })

      },
    })
  }, [courirSelected?.code, mutateAsync, numberResi])

  const renderContent = useCallback(() => {

    if (Boolean(wayBill)) {
      const DATA_AWB = wayBill?.data
      return (
        <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
          <Card>
            <CardContent>
              <div className='flex justify-between'>
                <div className="flex gap-2">
                  <Telegram color='action' />
                  <Typography fontWeight={'bold'}>{DATA_AWB?.summary.waybill_number}</Typography>
                </div>
                <Chip label={DATA_AWB?.delivery_status.status} color="primary" />
              </div>
              <Divider sx={{ mt: 2 }} />
              <Grid2 container spacing={2} mt={2}>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <LocalShipping color='action' sx={{ height: 18 }} />
                    <Typography variant='body2'>Courier</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.summary.courier_name}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <Inventory2 color='action' sx={{ height: 18 }} />
                    <Typography variant='body2'>Shipment Service</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.summary.service_code}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <FiberManualRecord color='action' sx={{ height: 18 }} />
                    <Typography variant='body2'>From</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.summary.origin}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <Place color='action' sx={{ height: 18 }} />
                    <Typography variant='body2'>To</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.summary.destination}</Typography>
                </Grid2>
              </Grid2>
              <Divider sx={{ my: 2 }} />
              <div className='flex gap-2'>
                <History color='action' />
                <Typography fontWeight={'bold'}>History</Typography>
              </div>
              <Divider sx={{ my: 2 }} />
              {
                DATA_AWB?.manifest.sort((a, b) => Date.parse(`${b.manifest_date} ${b.manifest_time}`) - Date.parse(`${a.manifest_date} ${a.manifest_time}`)).map((el, idx) => (
                  <Timeline
                    sx={{
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                    }}
                    key={idx}>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{el.manifest_description}</Typography>
                        <Typography variant='caption'>{`${el.manifest_date} ${el.manifest_time}`}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                ))
              }
              <Divider sx={{ my: 2 }} />
              <div className='flex gap-2'>
                <Info color='action' />
                <Typography fontWeight={'bold'}>Details</Typography>
              </div>
              <Divider sx={{ my: 2 }} />
              <Grid2 container spacing={2} mt={2}>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <Typography variant='body2'>Shipper Name</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.details.shipper_name}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <Typography variant='body2'>Shipper City</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.details.shipper_name}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <Typography variant='body2'>Receiver Name</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.details.receiver_name}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <div className="flex gap-1 items-center">
                    <Typography variant='body2'>Receiver City</Typography>
                  </div>
                  <Typography fontWeight={'bold'}>{DATA_AWB?.details.receiver_city}</Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Stack>
      )

    } else {
      return (
        <EmptyState description='Please Search by Number Resi and Courier' title='No Data' urlImage='/images/empty-state.svg' />
      )
    }
  }, [wayBill])

  return (
    <div className='px-5 mt-2 flex flex-col items-center'>
      <div>
        <Typography variant='h4'>Lacak Pengiriman</Typography>
      </div>
      <Typography>Masukkan Nomor Resi Anda</Typography>
      <Stack sx={{
        width: '100%',
        mt: 3,
        position: 'sticky',
        top: 0,
        left: 0,
        backgroundColor: trigger ? '#FEFEFE' : '',
        borderRadius: '0 0 10px 10px',
        zIndex: trigger ? 1000 : 1,
        padding: trigger ? '10px 24px' : '',
        transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out',
        backdropFilter: 'blur(8px)',
        boxShadow: trigger ? 3 : 0
      }} spacing={2}>
        <TextField
          label='Number AWB / Resi'
          onChange={handleChangeResi}
          value={numberResi}
          disabled={isPending}
          slotProps={{
            input: {
              endAdornment: numberResi && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setNumberResi('')}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          fullWidth
        />
        <AutoCompleteComponent
          handleSelected={handleSelected}
          courirSelected={courirSelected}
          disabled={isPending}
        />
        <Button
          fullWidth
          disabled={isPending}
          onClick={onHandleTrace}
          startIcon={isPending ? <CircularProgress color='inherit' size="20px" /> : <Search />}
          variant='contained'
          color='warning'
        >
          Search
        </Button>
      </Stack>
      {renderContent()}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={stateSnackBar.open} onClose={() => setStateSnackBar(prev => ({ ...prev, open: false }))}>
        <Alert
          onClose={() => setStateSnackBar(prev => ({ ...prev, open: false }))}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {stateSnackBar.title}
        </Alert>
      </Snackbar>
    </div>
  );
}