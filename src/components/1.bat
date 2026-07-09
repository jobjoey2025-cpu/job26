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