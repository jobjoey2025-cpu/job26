----- 26-08 -----

主資料夾 : VTOL\src\components\recentSystem
composables\recentSystem\
data\recentSystem
pages\RecentSystem.vue

----- ----- -----

                    RecentSystem
                         │
             ┌───────────┼───────────┐
             ↓           ↓           ↓
           UI          Data        Logic
             │           │           │
       Components       JS       Composables

----- ----- -----
規則：「這一個 Page 超過 500 行，不要再增加 Fn，只 modify / use routes 嵌入其他 Page。」


	基本版型				
	head line (subtitle)			    「頁首」	
		Btn (GDS 手冊 \ 快速筆記 dialog) \「Quick Note Dialog」	
2		GDSskdl Link			
3		AreaManager (Cards)			
5		Todo List			
6		做 report suao ... \ 			
					
	Expansion				
	頁面大綱 (link position)			「頁面大綱」	
1	ez time line 10mins or 快刀			「Timeline」	「10mins Test」
4	check list 現場 + print screen (這要常改)			「Checklist」	「Visibility」
					
	開發中 :	suao sys			
	FireJson doc	文字 issue			
	ROI	GPT			
----- ----- -----

修改 Btn Link 部分
----- ----- -----
RecentSystem.vue
        │
        ├── Header
        │
        ├── Outline
        │
        ├── Timeline
        │     ├── Test
        │     └── Visibility
        │
        ├── Checklist
        │
        └── NoteDialog -->
data/
        └── recentSystem/
            ├── timeline.js
            ├── checklist.js
            └── quickNotes.js
composables/
            └── recentSystem/
                ├── useRecentSystemNavigation.js
                └── useChecklist.js
----- ----- -----


