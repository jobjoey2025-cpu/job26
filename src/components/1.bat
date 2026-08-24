@echo off	
	
for /r %%f in (*.mp4) do (	
	
echo Processing %%f	
	
ffmpeg -y -ss 3 -i "%%f" -frames:v 1 temp1.jpg	
ffmpeg -y -ss 5 -i "%%f" -frames:v 1 temp2.jpg	
	
ffmpeg -y ^	
-i temp1.jpg ^	
-i temp2.jpg ^	
-filter_complex hstack ^	
%%~dpf%%~nf_preview.jpg	
	
)	
	
del temp1.jpg	
del temp2.jpg	
	
echo Done!	
pause	

@REM ------------------26-0824

@echo off	
	
for /r %%f in (*.mp4) do (	
	
    echo Processing %%f	
    
    :: 同時讀取兩個時間點，並透過 [0:v][1:v]hstack 直接合併輸出一張圖
    ffmpeg -y -ss 3 -i "%%f" -ss 5 -i "%%f" -filter_complex "[0:v][1:v]hstack" -frames:v 1 "%%~dpf%%~nf_preview.jpg"	
	
)	
	
echo Done!	
pause