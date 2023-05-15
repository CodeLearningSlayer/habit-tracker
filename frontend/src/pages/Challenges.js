import React from 'react';
import { Card, Typography, Grid, Box, Button, Snackbar } from '@mui/material';
import { useState } from 'react';

const buttonStyles = {
    position: "absolute", 
    top:"50%", 
    left:"50%",
    transform: "translateX(-50%) translateY(-50%)",
    color: "#fefefe",
    fontWeight: 700,
    opacity: 0,
    fontFamily: "Noto Sans, sans-serif"
}

const Challenges = () => {

    const [isOpen, setIsOpen] = useState();

    const openBar = () => {
        setIsOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsOpen(false);
      };

    return (
        <div>
            <Grid sx={{mt: "1px", ml:"1px"}} container spacing={7}>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{textAlign: "center", pt:"20px", fontFamily: "Noto Sans", color: "#fefefe", fontSize: 20}}>Better future</Typography>
                        <div className='grid__overlay'>
                            <Button sx={buttonStyles} onClick={openBar}>Accept challenge</Button>    
                        </div> 
                        <img src="https://mir-s3-cdn-cf.behance.net/projects/max_808/af645230022915.Y3JvcCw5MjEsNzIwLDE1NCww.png" style={{height: 170, maxWidth: 200, margin: "15px auto"}}></img>
                        <Typography variant='body1' sx={{textAlign: "center", mt:"20px", color: "#fefefe", fontFamily: "Noto Sans", fontSize: 20}}>Make friend every day</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{textAlign: "center", pt:"20px", fontFamily: "Noto Sans", color: "#fefefe", fontSize: 20}}>Stay strong</Typography>
                        <div className='grid__overlay'>
                            <Button sx={buttonStyles} onClick={openBar}>Accept challenge</Button>    
                        </div> 
                        <img src="https://www.pinclipart.com/picdir/big/559-5592646_article-image-32-push-up-silhouette-png-clipart.png" style={{height: 170, maxWidth: 250, margin: "15px auto"}}></img>
                        <Typography variant='body1' sx={{textAlign: "center", mt:"20px", color: "#fefefe", fontFamily: "Noto Sans", fontSize: 20}}>100 push ups for a day</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{textAlign: "center", pt:"20px", fontFamily: "Noto Sans", color: "#fefefe", fontSize: 20}}>Mindful life</Typography>
                        <div className='grid__overlay'>
                            <Button sx={buttonStyles} onClick={openBar}>Accept challenge</Button>    
                        </div> 
                        <img src="https://chowdy.com/wp-content/uploads/2018/12/Yoga-2-1.png" style={{height: 170, maxWidth: 200, margin: "15px auto"}}></img>
                        <Typography variant='body1' sx={{textAlign: "center", mt:"20px", color: "#fefefe", fontFamily: "Noto Sans", fontSize: 20}}>3 sessions of meditation a day</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>
                        <div className='grid__overlay'>
                            <Button sx={buttonStyles} onClick={openBar}>Accept challenge</Button>    
                        </div>                    
                        <Typography sx={{textAlign: "center", pt:"20px", fontFamily: "Noto Sans", color: "#fefefe", fontSize: 20}}>Son of god</Typography>
                        <img src="https://cdn.pixabay.com/photo/2020/04/06/08/56/ramadan-5008851_1280.png" style={{maxWidth: 150, margin: "15px auto"}}></img>
                        <Typography variant='body1' sx={{textAlign: "center", mt:"20px", color: "#fefefe", fontFamily: "Noto Sans", fontSize: 20}}>Pray everyday for 3 times</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{textAlign: "center", pt:"20px", fontFamily: "Noto Sans", color: "#fefefe", fontSize: 20}}>Journalling</Typography>
                        <div className='grid__overlay'>
                            <Button sx={buttonStyles} onClick={openBar}>Accept challenge</Button>    
                        </div> 
                        <img src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png" style={{height: 165, maxWidth: 150, margin: "15px auto"}}></img>
                        <Typography variant='body1' sx={{textAlign: "center", mt:"20px", color: "#fefefe", fontFamily: "Noto Sans", fontSize: 20}}>Make to-do list every morning</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{textAlign: "center", pt:"20px", fontFamily: "Noto Sans", color: "#fefefe", fontSize: 20}}>Save money</Typography>
                        <div className='grid__overlay'>
                            <Button sx={buttonStyles} onClick={openBar}>Accept challenge</Button>    
                        </div> 
                        <img src="https://pngshare.com/wp-content/uploads/2021/06/Money-Drawing-Artwork-2-1879x2048.png" style={{height: 165, maxWidth: 150, margin: "15px auto"}}></img>
                        <Typography variant='body1' sx={{textAlign: "center", mt:"20px", color: "#fefefe", fontFamily: "Noto Sans", fontSize: 20}}>Put money every day </Typography>
                    </Box>
                </Grid>
            </Grid>
           <Snackbar open={isOpen}
            autoHideDuration={1500}
            message="Challenge accepted"
            onClose={handleClose}/>
        </div>
    );
};

export default Challenges;