pytest paramets

-x : mark a test to be exited after the first failure
--last-failed : rerun only the tests that failed at the last run
--log-cli-level=LEVEL : set the logging level for the test run
-s : disable output capture, allowing print statements to be shown in the console
-ra : show extra test summary info for skipped, failed, and xfailed tests
--maxfail=N : stop the test run after N failures
--tb=STYLE : set the traceback style (auto/long/short/line/native/none)
--durations=N : show the N slowest test durations at the end of the test run
--cov=PATH : measure code coverage for the specified PATH
--cov-report=TYPE : specify the type of coverage report (term/html/xml)
--pdb : start the Python debugger on test failure
--ff : run the tests in the order of last failure first
--lf : run only the tests that failed at the last run
--collect-only : collect tests without executing them   