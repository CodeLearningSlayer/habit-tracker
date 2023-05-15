import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const Achievements = () => {
    return (
        <div>
            <Grid sx={{mt: "1px", ml:"1px"}} container spacing={7}>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{pt: "15px", m: "0 auto 15px", textAlign: "center", color:"#dedede", fontFamily: "Noto Sans, sans-serif"}}>First challenge accepted</Typography>
                        <img src="https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/First_Place_PNG_Clipart.png?m=1432204007" style={{maxWidth: "200px", margin:"0 auto"}}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>                    
                        <Typography sx={{pt: "15px", m: "0 auto 15px", textAlign: "center", color:"#dedede", fontFamily: "Noto Sans, sans-serif"}}>10nth challenge accepted</Typography>
                        <img src="https://www.pngplay.com/wp-content/uploads/1/10-Number-PNG-Free-Image.png" style={{maxWidth: "200px", margin:"0 auto"}}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>
                            <div className='grid__overlay grid__overlay--fixed'>
                            </div>                     
                        <Typography sx={{pt: "15px", m: "0 auto 15px", textAlign: "center", color:"#dedede", fontFamily: "Noto Sans, sans-serif"}}>First challenge accepted</Typography>
                        <img src="https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/First_Place_PNG_Clipart.png?m=1432204007" style={{maxWidth: "200px", margin:"0 auto"}}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>
                            <div className='grid__overlay grid__overlay--fixed'>
                            </div>                      
                        <Typography sx={{pt: "15px", m: "0 auto 15px", textAlign: "center", color:"#dedede", fontFamily: "Noto Sans, sans-serif"}}>First challenge accepted</Typography>
                        <img src="https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/First_Place_PNG_Clipart.png?m=1432204007" style={{maxWidth: "200px", margin:"0 auto"}}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>
                            <div className='grid__overlay grid__overlay--fixed'>
                            </div>                      
                        <Typography sx={{pt: "15px", m: "0 auto 15px", textAlign: "center", color:"#dedede", fontFamily: "Noto Sans, sans-serif"}}>First challenge accepted</Typography>
                        <img src="https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/First_Place_PNG_Clipart.png?m=1432204007" style={{maxWidth: "200px", margin:"0 auto"}}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{position: "relative", width: "300px", height: "300px", backgroundColor: "#423B3B", borderRadius: "20px", boxShadow: "0 0 15px 15px rgba(0,0,0,.1)"}}>
                            <div className='grid__overlay grid__overlay--fixed'>
                            </div>                      
                        <Typography sx={{pt: "15px", m: "0 auto 15px", textAlign: "center", color:"#dedede", fontFamily: "Noto Sans, sans-serif"}}>First challenge accepted</Typography>
                        <img src="https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/First_Place_PNG_Clipart.png?m=1432204007" style={{maxWidth: "200px", margin:"0 auto"}}/>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Achievements;